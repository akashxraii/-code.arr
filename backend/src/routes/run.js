const express = require('express');
const { pool, hasDatabase } = require('../db');
const auth = require('../middleware/auth');
const { runLimiter } = require('../middleware/rateLimits');
const { validateBody } = require('../middleware/validate');
const { runSchema } = require('../schemas');
const { problems: fallbackProblems } = require('../services/problemFallback');
const { runAgainstTests } = require('../services/codeRunner');

const router = express.Router();

async function getProblemAndTests(problemSlug, mode) {
  if (!hasDatabase) {
    const problem = fallbackProblems.find((item) => item.slug === problemSlug);
    const tests = problem?.testCases.filter((test) => mode === 'submit' || test.is_sample) || [];
    return { problem, tests };
  }

  const problemResult = await pool.query('SELECT * FROM problems WHERE slug = $1', [problemSlug]);
  const dbProblem = problemResult.rows[0];
  if (!dbProblem) return { problem: null, tests: [] };
  const catalogProblem = fallbackProblems.find((item) => item.slug === dbProblem.slug) || {};
  const problem = {
    ...dbProblem,
    function_name: dbProblem.function_name === 'solve' ? catalogProblem.function_name || dbProblem.function_name : dbProblem.function_name,
    input_signature: dbProblem.input_signature?.length ? dbProblem.input_signature : catalogProblem.inputSignature || [],
    output_signature: dbProblem.output_signature || catalogProblem.outputSignature || '',
  };

  const params = mode === 'submit' ? [problem.id] : [problem.id, true];
  const where = mode === 'submit' ? 'problem_id = $1' : 'problem_id = $1 AND is_sample = $2';
  const testsResult = await pool.query(
    `SELECT input, expected_output, is_sample FROM test_cases WHERE ${where} ORDER BY id ASC`,
    params,
  );
  return { problem, tests: testsResult.rows };
}

router.post('/', auth, runLimiter, validateBody(runSchema), async (req, res, next) => {
  const { problemSlug, language = 'javascript', code, mode = 'run' } = req.body;

  try {
    const { problem, tests } = await getProblemAndTests(problemSlug, mode);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    if (tests.length === 0) return res.status(400).json({ error: 'No test cases found' });

    const startedAt = Date.now();
    const result = await runAgainstTests({ code, language, tests, problem });
    const runtime = Date.now() - startedAt;
    const passed = result.results.filter((item) => item.status === 'passed').length;

    res.json({
      status: result.error ? 'runtime_error' : passed === tests.length ? 'accepted' : 'wrong_answer',
      passed,
      total: tests.length,
      runtime,
      results: result.results,
      error: result.error,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
