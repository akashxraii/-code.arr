import Editor from '@monaco-editor/react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';

function Workspace() {
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('Ready');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const sampleCases = useMemo(() => problem?.testCases || [], [problem]);

  useEffect(() => {
    api(`/api/problems/${slug}`)
      .then((payload) => {
        setProblem(payload);
        setCode(
          payload.starterCode?.javascript ||
            'function solve(input) {\n  // Write your solution here\n  return "";\n}\n',
        );
        setResults(
          (payload.testCases || []).map((testCase, index) => ({
            label: `Case ${index + 1}`,
            input: testCase.input,
            expected: testCase.expected_output,
            actual: '',
            status: 'idle',
          })),
        );
      })
      .catch((err) => setError(err.message));
  }, [slug]);

  async function run(mode) {
    setIsRunning(true);
    setError('');
    setStatus(mode === 'submit' ? 'Submitting...' : 'Running...');

    try {
      const payload = await api('/api/run', {
        method: 'POST',
        body: JSON.stringify({
          problemSlug: slug,
          language,
          code,
          mode,
        }),
      });
      setResults(payload.results || []);
      setStatus(`${payload.passed}/${payload.total} passed in ${payload.runtime}ms`);

      if (mode === 'submit' && problem?.id) {
        await api('/api/submissions', {
          method: 'POST',
          body: JSON.stringify({
            problem_id: problem.id,
            language,
            code,
          }),
        });
      }
    } catch (err) {
      setError(err.message);
      setStatus('Runner unavailable');
    } finally {
      setIsRunning(false);
    }
  }

  if (!problem) {
    return (
      <main className="page">
        <p>{error || 'Loading problem...'}</p>
      </main>
    );
  }

  return (
    <main className="workspace-page">
      <aside className="workspace-sidebar">
        <Link to="/problems" className="back-link">
          Back to problems
        </Link>
        <h1>{problem.title}</h1>
        <div className="tag-line">
          <span className={`difficulty ${problem.difficulty}`}>{problem.difficulty}</span>
          {problem.tags?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p>{problem.description}</p>
        <h2>Samples</h2>
        {sampleCases.map((testCase, index) => (
          <div className="sample-box" key={`${testCase.input}-${index}`}>
            <strong>Input</strong>
            <pre>{testCase.input}</pre>
            <strong>Expected</strong>
            <pre>{testCase.expected_output}</pre>
          </div>
        ))}
      </aside>

      <section className="editor-shell">
        <header className="workspace-toolbar">
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python soon</option>
            <option value="java">Java soon</option>
          </select>
          <button type="button" onClick={() => run('run')} disabled={isRunning}>
            Run
          </button>
          <button type="button" className="primary-button" onClick={() => run('submit')} disabled={isRunning}>
            Submit
          </button>
        </header>

        <div className="editor-box">
          <Editor
            height="100%"
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              lineHeight: 24,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        <section className="results-panel">
          <div className="result-status">
            <strong>{status}</strong>
            {error && <span className="error-text">{error}</span>}
          </div>
          <div className="result-grid">
            {results.map((result) => (
              <article className={`result-card ${result.status}`} key={result.label}>
                <h3>{result.label}</h3>
                <p>{result.status}</p>
                <pre>Input: {result.input}</pre>
                <pre>Expected: {result.expected}</pre>
                <pre>Actual: {result.actual}</pre>
                {result.error && <pre>{result.error}</pre>}
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Workspace;
