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
    <main className="page interview-setup-page">
      <form className="panel setup-panel" onSubmit={submit}>
        <p className="eyebrow">AI mock interview</p>
        <h1>Choose your interview domain and upload your CV.</h1>
        <label>
          Domain
          <select value={domain} onChange={(event) => setDomain(event.target.value)}>
            {domains.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          CV or resume
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(event) => setResume(event.target.files?.[0] || null)}
          />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button className="primary-button" disabled={isLoading} type="submit">
          {isLoading ? 'Uploading...' : 'Next'}
        </button>
      </form>
    </main>
  );
}

export default InterviewSetup;
