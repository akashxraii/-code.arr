import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';

const SILENCE_TIMEOUT_MS = 4 * 60 * 1000;

function getRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  return recognition;
}

function speak(text, onEnd) {
  if (!window.speechSynthesis) {
    onEnd?.();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

function InterviewRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const [question, setQuestion] = useState(
    sessionStorage.getItem('interview_first_question') || 'Welcome. Tell me about yourself.',
  );
  const [answer, setAnswer] = useState('');
  const [messages, setMessages] = useState([]);
  const [aiState, setAiState] = useState('speaking');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    let activeStream = null;

    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        activeStream = mediaStream;
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      })
      .catch(() => {});

    return () => {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.stop?.();
      clearTimeout(silenceTimerRef.current);
      activeStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleSilence = useCallback(async () => {
    setAiState('thinking');
    try {
      const payload = await api(`/api/interviews/${id}/silence`, { method: 'POST' });
      setQuestion(payload.question);
    } catch (err) {
      setError(err.message);
      setAiState('listening');
    }
  }, [id]);

  const resetSilenceTimer = useCallback(() => {
    clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = setTimeout(handleSilence, SILENCE_TIMEOUT_MS);
  }, [handleSilence]);

  useEffect(() => {
    setMessages((current) => [...current, { role: 'ai', content: question }]);
    setAiState('speaking');
    speak(question, () => {
      setAiState('listening');
      resetSilenceTimer();
    });
  }, [question, resetSilenceTimer]);

  function startListening() {
    const recognition = getRecognition();
    if (!recognition) {
      setError('Speech recognition is unavailable in this browser. Use the typed answer box.');
      return;
    }

    setError('');
    setAiState('listening');
    recognitionRef.current = recognition;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(transcript);
      resetSilenceTimer();
    };
    recognition.onerror = () => {
      setError('Speech recognition failed. You can type your answer instead.');
    };
    recognition.start();
  }

  async function submitAnswer(event) {
    event.preventDefault();
    if (!answer.trim()) return;

    clearTimeout(silenceTimerRef.current);
    setIsSending(true);
    setError('');
    setAiState('thinking');
    setMessages((current) => [...current, { role: 'user', content: answer }]);

    try {
      const payload = await api(`/api/interviews/${id}/answer`, {
        method: 'POST',
        body: JSON.stringify({ answer }),
      });
      setAnswer('');
      setQuestion(payload.question);
    } catch (err) {
      setError(err.message);
      setAiState('listening');
    } finally {
      setIsSending(false);
    }
  }

  async function finishInterview() {
    clearTimeout(silenceTimerRef.current);
    setAiState('thinking');
    try {
      await api(`/api/interviews/${id}/finish`, { method: 'POST' });
      navigate(`/interview/${id}/feedback`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="interview-room">
      <section className="interview-stage">
        <div className="question-panel">
          <p>{question}</p>
        </div>

        <div className={`ai-orb ${aiState}`}>
          <span />
        </div>

        <video className="user-tile" ref={videoRef} autoPlay muted playsInline />
      </section>

      <aside className="transcript-panel">
        <h2>Transcript</h2>
        {messages.slice(-8).map((message, index) => (
          <p key={`${message.role}-${index}`}>
            <strong>{message.role === 'ai' ? 'AI' : 'You'}:</strong> {message.content}
          </p>
        ))}
      </aside>

      <form className="interview-controls" onSubmit={submitAnswer}>
        <div>
          <strong>TechnoCode AIR</strong>
          <span>{aiState}</span>
        </div>
        <button type="button" onClick={startListening}>
          Speak
        </button>
        <input
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
            resetSilenceTimer();
          }}
          placeholder="Type your answer if voice is unavailable"
        />
        <button type="submit" className="primary-button" disabled={isSending}>
          Send
        </button>
        <button type="button" onClick={finishInterview}>
          Leave Interview
        </button>
      </form>

      {error && <p className="floating-error">{error}</p>}
    </main>
  );
}

export default InterviewRoom;
