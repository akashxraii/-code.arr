import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

function InterviewPermissions() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [status, setStatus] = useState('Waiting for Chrome to connect your camera and microphone.');
  const [error, setError] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    let activeStream = null;
    let isCancelled = false;

    async function requestMedia() {
      setError('');
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (isCancelled) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        activeStream = mediaStream;
        setStream(mediaStream);
        setStatus('Camera and microphone are ready.');
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setStatus('Camera and microphone are not connected.');
        setError(err.message || 'Camera or microphone permission was denied');
      }
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('Camera and microphone are not connected.');
      setError('Camera and microphone access is unavailable in this browser.');
      return undefined;
    }

    requestMedia();

    return () => {
      isCancelled = true;
      activeStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  async function startInterview() {
    setIsStarting(true);
    setError('');

    try {
      const setup = JSON.parse(sessionStorage.getItem('interview_setup') || '{}');
      if (!setup.domain || !setup.resumeId) {
        throw new Error('Interview setup is missing. Please upload your CV again.');
      }
      const payload = await api('/api/interviews', {
        method: 'POST',
        body: JSON.stringify(setup),
      });
      sessionStorage.setItem('interview_first_question', payload.question);
      navigate(`/interview/room/${payload.session.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsStarting(false);
    }
  }

  return (
    <main className="page permission-page">
      <section className="panel media-panel">
        <p className="eyebrow">Device check</p>
        <h1>Prepare your camera and microphone.</h1>
        <p>{status}</p>

        <video className="permission-preview" ref={videoRef} autoPlay muted playsInline />

        {error && <p className="error-text">{error}</p>}

        <div className="button-row">
          <button
            className="primary-button"
            type="button"
            disabled={!stream || isStarting}
            onClick={startInterview}
          >
            {isStarting ? 'Starting...' : 'Start Your Interview'}
          </button>
        </div>
      </section>
    </main>
  );
}

export default InterviewPermissions;
