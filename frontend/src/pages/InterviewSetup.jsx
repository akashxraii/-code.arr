import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const domains = [
  'Frontend Development',
  'Backend Development',
  'Full-stack Development',
  'Data Structures and Algorithms',
  'Machine Learning',
  'Data Analysis',
  'DevOps',
  'Cybersecurity',
  'General HR',
];

const interviewSteps = [
  {
    label: '01',
    title: 'Upload CV',
    text: 'The interviewer reads your resume context before the first question.',
  },
  {
    label: '02',
    title: 'Pick Domain',
    text: 'Choose the role area so follow-ups stay relevant to your target interview.',
  },
  {
    label: '03',
    title: 'Check Devices',
    text: 'Camera and microphone are verified before the live room opens.',
  },
  {
    label: '04',
    title: 'Answer Live',
    text: 'The AI asks, listens, adapts, and gives feedback when you finish.',
  },
];

const samplePrompts = [
  'Walk me through one project from your CV.',
  'What tradeoff did you make in that implementation?',
  'How would you improve the design if the traffic doubled?',
];

function InterviewSetup() {
  const navigate = useNavigate();
  const [domain, setDomain] = useState(domains[0]);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!resume) throw new Error('Upload a CV or resume first');
      const formData = new FormData();
      formData.append('resume', resume);
      const uploaded = await api('/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });
      sessionStorage.setItem('interview_setup', JSON.stringify({ domain, resumeId: uploaded.id }));
      navigate('/interview/permissions');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="interview-setup-page">
      <section className="interview-setup-hero" aria-labelledby="interview-setup-title">
        <div className="interview-intro">
          <p className="interview-kicker">/AI mock interview/</p>
          <h1 id="interview-setup-title">
            Bring the CV. We'll bring the interviewer.
          </h1>
          <p className="interview-lede">
            From resume screening to technical questioning, experience the complete interview process powered by AI.
          </p>

          <div className="interview-readiness" aria-label="Interview details">
            <span>30 min room</span>
            <span>CV-aware questions</span>
            <span>Voice follow-ups</span>
          </div>

          <div className="prompt-strip" aria-label="Example interview prompts">
            {samplePrompts.map((prompt) => (
              <p key={prompt}>{prompt}</p>
            ))}
          </div>
        </div>

        <form className="interview-setup-form" onSubmit={submit}>
          <div className="setup-form-head">
            <span className="setup-step-mark">Start</span>
            <h2>Set your interview target</h2>
          </div>

          <fieldset className="domain-picker">
            <legend>Supported domains</legend>
            <div className="domain-grid">
              {domains.map((item) => (
                <button
                  className={`domain-chip${domain === item ? ' active' : ''}`}
                  type="button"
                  key={item}
                  onClick={() => setDomain(item)}
                  aria-pressed={domain === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="setup-select">
            Domain
            <select value={domain} onChange={(event) => setDomain(event.target.value)}>
              {domains.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="resume-dropzone">
            <span>CV or resume</span>
            <strong>{resume ? resume.name : 'Choose a PDF, DOCX, or TXT file'}</strong>
            <small>Your CV personalizes the opening question and follow-ups.</small>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(event) => setResume(event.target.files?.[0] || null)}
            />
          </label>

          {error && <p className="error-text">{error}</p>}
          <button className="primary-button setup-submit" disabled={isLoading} type="submit">
            {isLoading ? 'Uploading...' : 'Continue to device check'}
          </button>
        </form>
      </section>

      <section className="interview-flow" aria-labelledby="interview-flow-title">
        <div>
          <p className="interview-kicker">/How it works/</p>
          <h2 id="interview-flow-title">From setup to feedback</h2>
        </div>
        <div className="interview-flow-grid">
          {interviewSteps.map((step) => (
            <article key={step.label}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default InterviewSetup;
