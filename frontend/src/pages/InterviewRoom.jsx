import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { API_BASE_URL, api, getToken } from '../api';

const SILENCE_TIMEOUT_MS = 4 * 60 * 1000;
const INTERVIEW_DURATION_MS = 30 * 60 * 1000;
const ANSWER_FINAL_PAUSE_MS = 8 * 1000;
const RECOGNITION_RESTART_DELAY_MS = 450;
const MAX_RECOGNITION_ERRORS = 3;

function formatRemainingTime(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  return recognition;
}

async function fetchQuestionAudio(sessionId, signal) {
  const headers = new Headers();
  const token = getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}/api/interviews/${sessionId}/speech`, {
    method: 'POST',
    headers,
    signal,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || 'Premium interviewer voice is unavailable.');
  }

  return response.blob();
}

function InterviewRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const socketRef = useRef(null);
  const startListeningRef = useRef(null);
  const answerFinalizeTimerRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const recognitionRestartTimerRef = useRef(null);
  const audioRef = useRef(null);
  const audioUrlRef = useRef('');
  const isListeningRef = useRef(false);
  const isSubmittingRef = useRef(false);
  const hasFinishedRef = useRef(false);
  const spokenAnswerRef = useRef('');
  const pendingTranscriptRef = useRef('');
  const recognitionErrorCountRef = useRef(0);
  const [question, setQuestion] = useState(
    sessionStorage.getItem('interview_first_question') || 'Welcome. Tell me about yourself.',
  );
  const [messages, setMessages] = useState([]);
  const [aiState, setAiState] = useState('speaking');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [remainingTimeMs, setRemainingTimeMs] = useState(INTERVIEW_DURATION_MS);
  const [error, setError] = useState('');
  const [voiceIssue, setVoiceIssue] = useState('');
  const [speechAttempt, setSpeechAttempt] = useState(0);

  const clearSilenceTimer = useCallback(() => {
    clearTimeout(silenceTimerRef.current);
  }, []);

  const clearAnswerFinalizeTimer = useCallback(() => {
    clearTimeout(answerFinalizeTimerRef.current);
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.src = '';
      audioRef.current = null;
    }

    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = '';
    }
  }, []);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    clearTimeout(recognitionRestartTimerRef.current);
    clearAnswerFinalizeTimer();

    const recognition = recognitionRef.current;
    recognitionRef.current = null;

    if (recognition) {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      try {
        recognition.stop();
      } catch {
        // Chrome throws if recognition has already stopped.
      }
    }
  }, [clearAnswerFinalizeTimer]);

  const handleSilence = useCallback(async () => {
    if (isSubmittingRef.current || hasFinishedRef.current) return;

    stopListening();
    setAiState('thinking');
    setLiveTranscript('');
    spokenAnswerRef.current = '';
    pendingTranscriptRef.current = '';
    setError('');
    isSubmittingRef.current = true;

    try {
      const payload = await api(`/api/interviews/${id}/silence`, { method: 'POST' });
      isSubmittingRef.current = false;
      if (payload.question) {
        setQuestion(payload.question);
      }
    } catch (err) {
      isSubmittingRef.current = false;
      setError(err.message);
      setAiState('listening');
      startListeningRef.current?.();
    }
  }, [id, stopListening]);

  const resetSilenceTimer = useCallback(() => {
    clearSilenceTimer();
    silenceTimerRef.current = setTimeout(handleSilence, SILENCE_TIMEOUT_MS);
  }, [clearSilenceTimer, handleSilence]);

  const submitSpokenAnswer = useCallback(
    async (transcript) => {
      const spokenAnswer = transcript.trim();
      if (!spokenAnswer || isSubmittingRef.current || hasFinishedRef.current) return;

      stopListening();
      clearSilenceTimer();
      clearAnswerFinalizeTimer();
      isSubmittingRef.current = true;
      recognitionErrorCountRef.current = 0;
      spokenAnswerRef.current = '';
      pendingTranscriptRef.current = '';
      setLiveTranscript('');
      setError('');
      setVoiceIssue('');
      setAiState('thinking');
      setMessages((current) => [...current, { role: 'user', content: spokenAnswer }]);

      try {
        const payload = await api(`/api/interviews/${id}/answer`, {
          method: 'POST',
          body: JSON.stringify({ answer: spokenAnswer }),
        });
        isSubmittingRef.current = false;
        if (payload.question) {
          setQuestion(payload.question);
        }
      } catch (err) {
        isSubmittingRef.current = false;
        setError(err.message);
        setAiState('listening');
        startListeningRef.current?.();
      }
    },
    [clearAnswerFinalizeTimer, clearSilenceTimer, id, stopListening],
  );

  const startListening = useCallback(() => {
    if (isSubmittingRef.current || hasFinishedRef.current) return;

    const recognition = getRecognition();
    if (!recognition) {
      setVoiceIssue('Voice recognition is unavailable. Open the interview in Chrome or Edge.');
      setAiState('blocked');
      return;
    }

    setError('');
    setVoiceIssue('');
    setAiState('listening');
    isListeningRef.current = true;
    resetSilenceTimer();
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0].transcript;
        if (event.results[index].isFinal) {
          spokenAnswerRef.current = `${spokenAnswerRef.current} ${transcript}`.trim();
        } else {
          interimTranscript = `${interimTranscript} ${transcript}`.trim();
        }
      }

      const currentTranscript = `${spokenAnswerRef.current} ${interimTranscript}`.trim();
      pendingTranscriptRef.current = currentTranscript;
      setLiveTranscript(currentTranscript);

      if (currentTranscript) {
        clearAnswerFinalizeTimer();
        answerFinalizeTimerRef.current = setTimeout(() => {
          submitSpokenAnswer(pendingTranscriptRef.current);
        }, ANSWER_FINAL_PAUSE_MS);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'aborted' || event.error === 'no-speech') return;

      recognitionErrorCountRef.current += 1;
      if (recognitionErrorCountRef.current >= MAX_RECOGNITION_ERRORS) {
        stopListening();
        setVoiceIssue('Speech recognition is having trouble hearing you. Check microphone access and retry.');
        setAiState('blocked');
      } else {
        setError('Speech recognition hiccuped. Listening will resume automatically.');
      }
    };

    recognition.onend = () => {
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }

      if (isListeningRef.current && !isSubmittingRef.current && !hasFinishedRef.current) {
        clearTimeout(recognitionRestartTimerRef.current);
        recognitionRestartTimerRef.current = setTimeout(() => {
          startListeningRef.current?.();
        }, RECOGNITION_RESTART_DELAY_MS);
      }
    };

    try {
      recognition.start();
    } catch {
      clearTimeout(recognitionRestartTimerRef.current);
      recognitionRestartTimerRef.current = setTimeout(() => {
        startListeningRef.current?.();
      }, RECOGNITION_RESTART_DELAY_MS);
    }
  }, [clearAnswerFinalizeTimer, resetSilenceTimer, stopListening, submitSpokenAnswer]);

  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setError('Authentication is required for live interview updates.');
      return undefined;
    }

    const socket = io(API_BASE_URL, {
      auth: { token },
      transports: ['websocket'],
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join:session', id);
    });

    socket.on('connect_error', (err) => {
      if (err.message && !/xhr poll error|websocket error|timeout/i.test(err.message)) {
        setError(err.message);
      }
    });

    socket.on('join:error', (payload) => {
      setError(payload?.error || 'Could not join live interview session.');
    });

    socket.on('ai:thinking', () => {
      setAiState('thinking');
    });

    socket.on('ai:question_ready', (payload) => {
      isSubmittingRef.current = false;
      if (payload?.question) {
        setQuestion(payload.question);
      }
    });

    socket.on('ai:error', (payload) => {
      isSubmittingRef.current = false;
      setError(payload?.error || 'Could not prepare the next question.');
      setAiState('listening');
      startListeningRef.current?.();
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('join:error');
      socket.off('ai:thinking');
      socket.off('ai:question_ready');
      socket.off('ai:error');
      socket.disconnect();
      if (socketRef.current === socket) {
        socketRef.current = null;
      }
    };
  }, [id]);

  useEffect(() => {
    let activeStream = null;

    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        activeStream = mediaStream;
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      })
      .catch(() => {
        setError('Camera or microphone access is unavailable.');
      });

    return () => {
      stopAudio();
      stopListening();
      clearAnswerFinalizeTimer();
      clearSilenceTimer();
      clearTimeout(recognitionRestartTimerRef.current);
      activeStream?.getTracks().forEach((track) => track.stop());
    };
  }, [clearAnswerFinalizeTimer, clearSilenceTimer, stopAudio, stopListening]);

  useEffect(() => {
    const controller = new AbortController();

    setMessages((current) => {
      const latest = current[current.length - 1];
      if (latest?.role === 'ai' && latest.content === question) return current;
      return [...current, { role: 'ai', content: question }];
    });

    async function speakQuestion() {
      stopListening();
      clearAnswerFinalizeTimer();
      clearSilenceTimer();
      stopAudio();
      spokenAnswerRef.current = '';
      pendingTranscriptRef.current = '';
      setLiveTranscript('');
      setError('');
      setVoiceIssue('');
      setAiState('speaking');

      try {
        const audioBlob = await fetchQuestionAudio(id, controller.signal);
        if (controller.signal.aborted || hasFinishedRef.current) return;

        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audioUrlRef.current = audioUrl;
        audioRef.current = audio;

        audio.onended = () => {
          stopAudio();
          if (!hasFinishedRef.current) {
            setAiState('listening');
            startListeningRef.current?.();
          }
        };

        audio.onerror = () => {
          stopAudio();
          setVoiceIssue('Could not play the interviewer voice. Retry voice when you are ready.');
          setAiState('blocked');
        };

        await audio.play();
      } catch (err) {
        if (controller.signal.aborted || hasFinishedRef.current) return;
        stopAudio();
        setVoiceIssue(err.message || 'Could not start the interviewer voice.');
        setAiState('blocked');
      }
    }

    speakQuestion();

    return () => {
      controller.abort();
      stopAudio();
    };
  }, [clearAnswerFinalizeTimer, clearSilenceTimer, id, question, speechAttempt, stopAudio, stopListening]);

  function retryVoice() {
    recognitionErrorCountRef.current = 0;
    setError('');
    setVoiceIssue('');
    setSpeechAttempt((attempt) => attempt + 1);
  }

  const finishInterview = useCallback(async () => {
    hasFinishedRef.current = true;
    clearAnswerFinalizeTimer();
    clearSilenceTimer();
    stopListening();
    stopAudio();
    setAiState('thinking');
    try {
      await api(`/api/interviews/${id}/finish`, { method: 'POST' });
      navigate(`/interview/${id}/feedback`);
    } catch (err) {
      hasFinishedRef.current = false;
      setError(err.message);
      setAiState('blocked');
    }
  }, [clearAnswerFinalizeTimer, clearSilenceTimer, id, navigate, stopAudio, stopListening]);

  useEffect(() => {
    let intervalId = null;
    let timeoutId = null;
    const timerStorageKey = `interview_timer_started_at_${id}`;
    const storedStartedAt = Number(sessionStorage.getItem(timerStorageKey));
    const timerStartedAt = Number.isFinite(storedStartedAt) && storedStartedAt > 0 ? storedStartedAt : Date.now();
    sessionStorage.setItem(timerStorageKey, String(timerStartedAt));
    const expiresAt = timerStartedAt + INTERVIEW_DURATION_MS;

    function syncRemainingTime() {
      const remaining = Math.max(0, expiresAt - Date.now());
      setRemainingTimeMs(remaining);
      return remaining;
    }

    const remaining = syncRemainingTime();
    if (remaining <= 0) {
      finishInterview();
    } else {
      intervalId = setInterval(syncRemainingTime, 1000);
      timeoutId = setTimeout(() => {
        if (!hasFinishedRef.current) finishInterview();
      }, remaining);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [finishInterview, id]);

  const statusText =
    aiState === 'speaking'
      ? 'Interviewer is speaking'
      : aiState === 'thinking'
        ? 'Preparing the next question'
        : aiState === 'blocked'
          ? 'Voice needs attention'
          : liveTranscript
            ? `Heard: ${liveTranscript} Waiting for your final pause...`
            : 'Listening for your answer';

  return (
    <main className="interview-room">
      <section className="interview-stage">
        <div className="stage-ambient" aria-hidden="true" />
        <div className="question-panel">
          <span>Current question</span>
          <p>{question}</p>
        </div>

        <div className="orb-stage" aria-label={`AI interviewer is ${aiState}`}>
          <div className={`ai-orb ${aiState}`}>
            <span />
          </div>
          <div className="orb-brackets" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="user-tile-wrap">
          <video className="user-tile" ref={videoRef} autoPlay muted playsInline />
          <span>Live</span>
          <strong>You</strong>
        </div>
      </section>

      <aside className="transcript-panel">
        <div className="transcript-head">
          <h2>Transcript</h2>
          <span>{messages.length} lines</span>
        </div>
        {messages.slice(-8).map((message, index) => (
          <p key={`${message.role}-${index}`}>
            <strong>{message.role === 'ai' ? 'AI' : 'You'}:</strong> {message.content}
          </p>
        ))}
      </aside>

      <footer className="interview-controls">
        <div>
          <strong>code.arr AIR</strong>
          <span>{aiState}</span>
        </div>
        <div className="interview-timer" aria-label="Interview time remaining">
          <strong>{formatRemainingTime(remainingTimeMs)}</strong>
          <span>remaining</span>
        </div>
        <p className={voiceIssue ? 'voice-status voice-status-error' : 'voice-status'}>
          {voiceIssue || statusText}
        </p>
        {voiceIssue && (
          <button type="button" onClick={retryVoice}>
            Retry Voice
          </button>
        )}
        <button type="button" onClick={finishInterview}>
          Leave Interview
        </button>
      </footer>

      {error && <p className="floating-error">{error}</p>}
    </main>
  );
}

export default InterviewRoom;
