import { useEffect, useState } from 'react';
import { api } from '../api';

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/submissions/my')
      .then(setSubmissions)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="page">
      <header className="page-head">
        <p className="eyebrow">History</p>
        <h1>My Submissions</h1>
      </header>

      {error && <p className="error-text">{error}</p>}

      <section className="table-panel">
        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          submissions.map((submission) => (
            <div className="submission-row" key={submission.id}>
              <strong>{submission.title}</strong>
              <span>{submission.language}</span>
              <span className={`status ${submission.status}`}>{submission.status}</span>
              <span>{submission.runtime ? `${submission.runtime}ms` : '-'}</span>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Submissions;
