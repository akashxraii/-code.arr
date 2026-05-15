import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function Problems() {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/problems')
      .then(setProblems)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="page">
      <header className="page-head">
        <p className="eyebrow">Practice</p>
        <h1>Problems</h1>
      </header>

      {error && <p className="error-text">{error}</p>}

      <section className="problem-list">
        {problems.map((problem) => (
          <Link className="problem-row" key={problem.slug} to={`/problems/${problem.slug}`}>
            <div>
              <h2>{problem.title}</h2>
              <p>{problem.tags?.join(', ') || 'General'}</p>
            </div>
            <span className={`difficulty ${problem.difficulty}`}>{problem.difficulty}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Problems;
