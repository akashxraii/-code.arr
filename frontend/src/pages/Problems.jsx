import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

const FALLBACK_DAILY_PROBLEM = {
  title: 'Practice Library',
  slug: '',
  difficulty: 'easy',
  description: 'Choose a problem from the library and keep your solving loop warm.',
};

const DIFFICULTY_ORDER = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const HIDDEN_TAGS = new Set(['leetcode', 'codeforces', 'hackerrank', 'codechef']);

function normalizeDifficulty(difficulty) {
  return String(difficulty || 'easy').toLowerCase();
}

function getVisibleTags(tags = []) {
  return tags.filter((tag) => !HIDDEN_TAGS.has(tag.toLowerCase()));
}

function Problems() {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [sortMode, setSortMode] = useState('default');

  useEffect(() => {
    api('/api/problems')
      .then(setProblems)
      .catch((err) => setError(err.message));
  }, []);

  const featuredTopics = useMemo(() => {
    const topicCounts = new Map();

    problems.forEach((problem) => {
      getVisibleTags(problem.tags).forEach((tag) => {
        topicCounts.set(tag, (topicCounts.get(tag) || 0) + 1);
      });
    });

    return [...topicCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, 12);
  }, [problems]);

  const visibleProblems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const topic = selectedTopic.toLowerCase();
    const filtered = problems.filter((problem) => {
      const topicMatches =
        !topic || problem.tags?.some((tag) => tag.toLowerCase() === topic);

      if (!topicMatches) return false;

      if (query) {
        const titleMatches = problem.title?.toLowerCase().includes(query);
        const tagMatches = problem.tags?.some((tag) => tag.toLowerCase().includes(query));
        const difficultyMatches = normalizeDifficulty(problem.difficulty).includes(query);
        return titleMatches || tagMatches || difficultyMatches;
      }

      return true;
    });

    if (sortMode === 'title') {
      return filtered.sort((a, b) => String(a.title || '').localeCompare(String(b.title || '')));
    }

    if (sortMode === 'difficulty-asc') {
      return filtered.sort((a, b) => {
        const difficultyDiff =
          (DIFFICULTY_ORDER[normalizeDifficulty(a.difficulty)] || 99) -
          (DIFFICULTY_ORDER[normalizeDifficulty(b.difficulty)] || 99);
        return difficultyDiff || String(a.title || '').localeCompare(String(b.title || ''));
      });
    }

    if (sortMode === 'difficulty-desc') {
      return filtered.sort((a, b) => {
        const difficultyDiff =
          (DIFFICULTY_ORDER[normalizeDifficulty(b.difficulty)] || 0) -
          (DIFFICULTY_ORDER[normalizeDifficulty(a.difficulty)] || 0);
        return difficultyDiff || String(a.title || '').localeCompare(String(b.title || ''));
      });
    }

    return filtered;
  }, [problems, searchTerm, selectedTopic, sortMode]);

  const dailyProblem = problems[0] || FALLBACK_DAILY_PROBLEM;
  const dailyProblemPath = dailyProblem.slug ? `/problems/${dailyProblem.slug}` : '/problems';
  const dailyDifficulty = normalizeDifficulty(dailyProblem.difficulty);

  return (
    <main className="problems-page">
      <div className="problems-shell">
        <aside className="problems-sidebar" aria-label="Problem highlights">
          <section className="daily-card">
            <p className="problems-kicker">Daily Challenge</p>
            <h2>{dailyProblem.title}</h2>
            <p>{dailyProblem.description || FALLBACK_DAILY_PROBLEM.description}</p>
            <div className="daily-meta">
              <span className={`difficulty ${dailyDifficulty}`}>{dailyDifficulty}</span>
              <span>{problems.length} problems loaded</span>
            </div>
            <Link className="solve-link" to={dailyProblemPath}>
              Solve now
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </section>

          <section className="topic-panel" aria-labelledby="featured-topics">
            <div className="topic-panel-head">
              <h2 id="featured-topics">Featured Topics</h2>
              {selectedTopic && (
                <button className="topic-clear" type="button" onClick={() => setSelectedTopic('')}>
                  Clear
                </button>
              )}
            </div>
            <div className="topic-list">
              {featuredTopics.length > 0 ? (
                featuredTopics.map((topic) => (
                  <button
                    className={`topic-chip${selectedTopic === topic.name ? ' active' : ''}`}
                    type="button"
                    key={topic.name}
                    onClick={() => setSelectedTopic((current) => (current === topic.name ? '' : topic.name))}
                    aria-pressed={selectedTopic === topic.name}
                  >
                    <span>{topic.name}</span>
                    <strong>{topic.count}</strong>
                  </button>
                ))
              ) : (
                <p>No topics loaded yet.</p>
              )}
            </div>
            {selectedTopic && (
              <p className="topic-filter-note">
                Showing {visibleProblems.length} {selectedTopic} problem
                {visibleProblems.length === 1 ? '' : 's'}.
              </p>
            )}
          </section>
        </aside>

        <section className="problem-library" aria-labelledby="problem-title">
          <div className="library-header">
            <div>
              <p className="problems-kicker">Practice Library</p>
              <h1 id="problem-title">Problems</h1>
            </div>

            <div className="problem-tools">
              <label className="problem-search">
                <span className="search-icon" aria-hidden="true"></span>
                <span className="sr-only">Search problems</span>
                <input
                  type="search"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </label>
              <label className="sort-select">
                <span>Sort by</span>
                <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
                  <option value="default">Default</option>
                  <option value="title">Title A-Z</option>
                  <option value="difficulty-asc">Easy first</option>
                  <option value="difficulty-desc">Hard first</option>
                </select>
              </label>
            </div>
          </div>

          {error && <p className="library-message error-text">{error}</p>}

          {!error && problems.length === 0 && <p className="library-message">No problems loaded yet.</p>}

          {!error && problems.length > 0 && visibleProblems.length === 0 && (
            <p className="library-message">No problems match your search.</p>
          )}

          <div className="problem-list">
            {visibleProblems.map((problem, index) => {
              const difficulty = normalizeDifficulty(problem.difficulty);
              const visibleTags = getVisibleTags(problem.tags);
              return (
                <Link className="problem-row" key={problem.slug} to={`/problems/${problem.slug}`}>
                  <div className="problem-main">
                    <span className="problem-id">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h2>{problem.title}</h2>
                      <div className="problem-meta">
                        <span className={`difficulty ${difficulty}`}>{difficulty}</span>
                      </div>
                    </div>
                  </div>

                  {visibleTags.length > 0 && (
                    <div className="problem-topics" aria-label={`${problem.title} topics`}>
                      {visibleTags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Problems;
