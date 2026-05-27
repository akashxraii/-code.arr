import Editor from '@monaco-editor/react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';
import {
  getInputSignature,
  getOutputSignature,
  getStatementConstraints,
  getStatementExamples,
} from '../data/problemStatement';
import { getLanguageConfig, getLanguageTemplate, WORKSPACE_LANGUAGES } from '../data/workspaceLanguages';
import { useWorkspaceSplit } from '../hooks/useWorkspaceSplit';

const HIDDEN_TAGS = new Set(['leetcode', 'codeforces', 'hackerrank', 'codechef']);

function getVisibleTags(tags = []) {
  return tags.filter((tag) => !HIDDEN_TAGS.has(String(tag).toLowerCase()));
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-toggle-icon">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-toggle-icon">
      <path d="M20.2 14.3A7.4 7.4 0 0 1 9.7 3.8 8.5 8.5 0 1 0 20.2 14.3Z" />
    </svg>
  );
}

function getCodeStorageKey(slug, language) {
  return `workspace_code:${slug}:${language}`;
}

function getStarterStorageKey(slug, language) {
  return `workspace_starter:${slug}:${language}`;
}

function isLegacySolveDraft(code, problem) {
  const functionName = problem?.functionName || problem?.function_name || 'solve';
  const inputSignature = problem?.inputSignature || problem?.input_signature || [];

  return functionName !== 'solve' && inputSignature.length > 0 && /\bsolve\s*\(/.test(code || '');
}

function Workspace() {
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [results, setResults] = useState([]);
  const [hasRunResults, setHasRunResults] = useState(false);
  const [status, setStatus] = useState('Ready');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ lineNumber: 1, column: 1 });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('workspace_theme') !== 'light';
  });
  const { isResizing, panelWidth, startResizing } = useWorkspaceSplit();

  const sampleCases = useMemo(() => problem?.testCases || [], [problem]);
  const statementExamples = useMemo(() => getStatementExamples(problem), [problem]);
  const statementConstraints = useMemo(() => getStatementConstraints(problem), [problem]);
  const inputSignature = useMemo(() => getInputSignature(problem), [problem]);
  const outputSignature = useMemo(() => getOutputSignature(problem), [problem]);
  const languageConfig = useMemo(() => getLanguageConfig(language), [language]);
  const visibleTags = useMemo(() => getVisibleTags(problem?.tags), [problem]);

  useEffect(() => {
    document.body.classList.toggle('workspace-dark-mode', isDarkMode);
    localStorage.setItem('workspace_theme', isDarkMode ? 'dark' : 'light');

    return () => {
      document.body.classList.remove('workspace-dark-mode');
    };
  }, [isDarkMode]);

  useEffect(() => {
    api(`/api/problems/${slug}`)
      .then((payload) => {
        setProblem(payload);
        setResults([]);
        setHasRunResults(false);
        setStatus('Ready');
      })
      .catch((err) => setError(err.message));
  }, [slug]);

  useEffect(() => {
    if (!problem) return;

    const codeKey = getCodeStorageKey(slug, language);
    const starterKey = getStarterStorageKey(slug, language);
    const savedCode = localStorage.getItem(codeKey);
    const previousStarter = localStorage.getItem(starterKey);
    const starterCode = getLanguageTemplate(language, problem);
    const starterChanged = previousStarter && previousStarter !== starterCode;
    const savedCodeIsOldStarter = savedCode && previousStarter && savedCode.trim() === previousStarter.trim();
    const savedCodeIsLegacySolve = isLegacySolveDraft(savedCode, problem);

    setCode((starterChanged && savedCodeIsOldStarter) || savedCodeIsLegacySolve ? starterCode : savedCode ?? starterCode);
    localStorage.setItem(starterKey, starterCode);
    setResults([]);
    setHasRunResults(false);
    setStatus('Ready');
    setError('');
  }, [language, problem, slug]);

  useEffect(() => {
    if (!problem) return;

    localStorage.setItem(getCodeStorageKey(slug, language), code);
  }, [code, language, problem, slug]);

  async function run(mode) {
    setIsRunning(true);
    setError('');
    setStatus(mode === 'submit' ? 'Submitting...' : 'Running...');
    setHasRunResults(true);

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
      <main className={`page workspace-loading-page ${isDarkMode ? 'workspace-loading-dark' : ''}`}>
        <p>{error || 'Loading problem...'}</p>
      </main>
    );
  }

  return (
    <main
      className={`workspace-page ${isDarkMode ? 'workspace-page-dark' : 'workspace-page-light'} ${
        isResizing ? 'is-resizing' : ''
      }`}
      style={{ '--question-panel-width': `${panelWidth}px` }}
    >
      <header className="workspace-header">
        <div className="workspace-header-left">
          <Link to="/problems" className="back-link">
            Back
          </Link>
        </div>

        <div className="workspace-header-actions">
          <button
            type="button"
            className="theme-toggle-button"
            onClick={() => setIsDarkMode((value) => !value)}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <button type="button" onClick={() => run('run')} disabled={isRunning}>
            Run
          </button>
          <button type="button" className="primary-button" onClick={() => run('submit')} disabled={isRunning}>
            Submit
          </button>
        </div>
      </header>

      <div className="workspace-body">
        <aside className="workspace-sidebar">
          <h1>{problem.title}</h1>
          <div className="tag-line">
            <span className={`difficulty ${problem.difficulty}`}>{problem.difficulty}</span>
            {visibleTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p>{problem.description}</p>

          {(inputSignature.length > 0 || outputSignature) && (
            <section className="statement-section">
              <h2>Signature</h2>
              {inputSignature.length > 0 && (
                <div className="signature-list">
                  {inputSignature.map((item) => (
                    <span key={`${item.name}-${item.type}`}>
                      <strong>{item.name}</strong>: {item.type}
                    </span>
                  ))}
                </div>
              )}
              {outputSignature && (
                <p className="output-signature">
                  Returns <strong>{outputSignature}</strong>
                </p>
              )}
            </section>
          )}

          {statementExamples.length > 0 && (
            <section className="statement-section">
              <h2>Examples</h2>
              {statementExamples.map((example) => (
                <div className="statement-example" key={example.label}>
                  <strong>{example.label}</strong>
                  <span>Input</span>
                  <pre>{example.input}</pre>
                  <span>Output</span>
                  <pre>{example.output}</pre>
                  {example.explanation && <p className="example-explanation">{example.explanation}</p>}
                </div>
              ))}
            </section>
          )}

          {statementConstraints.length > 0 && (
            <section className="statement-section">
              <h2>Constraints</h2>
              <ul className="constraint-list">
                {statementConstraints.map((constraint) => (
                  <li key={constraint}>{constraint}</li>
                ))}
              </ul>
            </section>
          )}

          {hasRunResults && (
            <>
              <h2>Test Cases</h2>
              {sampleCases.map((testCase, index) => (
                <div className="sample-box" key={`${testCase.input}-${index}`}>
                  <strong>Input</strong>
                  <pre>{testCase.input}</pre>
                  <strong>Expected</strong>
                  <pre>{testCase.expected_output}</pre>
                </div>
              ))}
            </>
          )}
        </aside>

        <button
          type="button"
          className="workspace-resizer"
          onPointerDown={startResizing}
          aria-label="Resize question and editor panels"
        />

        <section className={`editor-shell ${hasRunResults ? 'has-results' : ''}`}>
          <div className="editor-card">
            <div className="editor-topbar">
              <div className="editor-title">
                <strong>Code</strong>
              </div>
            </div>
            <div className="editor-controlbar">
              <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Language">
                {WORKSPACE_LANGUAGES.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="editor-box">
              <Editor
                height="100%"
                language={languageConfig.monaco}
                theme={isDarkMode ? 'vs-dark' : 'light'}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={(editor) => {
                  setCursorPosition(editor.getPosition() || { lineNumber: 1, column: 1 });
                  editor.onDidChangeCursorPosition((event) => setCursorPosition(event.position));
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineHeight: 21,
                  fontFamily: '"Cascadia Code", "SFMono-Regular", Consolas, monospace',
                  padding: { top: 8, bottom: 8 },
                  renderLineHighlight: 'line',
                  scrollBeyondLastLine: false,
                  overviewRulerBorder: false,
                  automaticLayout: true,
                }}
              />
            </div>
            <div className="editor-statusbar">
              <span>Saved</span>
              <span>
                Ln {cursorPosition.lineNumber}, Col {cursorPosition.column}
              </span>
            </div>
          </div>

          {hasRunResults && (
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
          )}
        </section>
      </div>
    </main>
  );
}

export default Workspace;
