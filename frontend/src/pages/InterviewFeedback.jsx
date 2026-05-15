import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';

function InterviewFeedback() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api(`/api/interviews/${id}`)
      .then(setData)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <main className="page">
        <p className="error-text">{error}</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="page">
        <p>Loading feedback...</p>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="panel feedback-panel">
        <p className="eyebrow">{data.session.domain}</p>
        <h1>Interview Feedback</h1>
        <div className="score-ring">{data.feedback?.score || '-'}</div>
        <h2>Strengths</h2>
        <p>{data.feedback?.strengths || 'No strengths recorded yet.'}</p>
        <h2>Improvements</h2>
        <p>{data.feedback?.improvements || 'No improvement notes recorded yet.'}</p>
        <h2>Summary</h2>
        <p>{data.feedback?.summary || 'No summary recorded yet.'}</p>
        <Link className="primary-link" to="/interview">
          Practice Again
        </Link>
      </section>
    </main>
  );
}

export default InterviewFeedback;
