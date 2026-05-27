const express = require('express');
const { Queue } = require('bullmq');
const { pool, requireDatabase } = require('../db');
const auth = require('../middleware/auth');
const { submissionLimiter } = require('../middleware/rateLimits');
const { validateBody } = require('../middleware/validate');
const { submissionSchema } = require('../schemas');
const { problems: fallbackProblems } = require('../services/problemFallback');

const router = express.Router();
let submissionQueue;

function getQueue() {
  if (!submissionQueue) {
    submissionQueue = new Queue('submissions', {
      connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: Number(process.env.REDIS_PORT || 6379),
      },
    });
  }
  return submissionQueue;
}

router.post('/', submissionLimiter, requireDatabase, auth, validateBody(submissionSchema), async (req, res, next) => {
  const { problem_id, language = 'javascript', code } = req.body;

  try {
    const submissionResult = await pool.query(
      `INSERT INTO submissions (user_id, problem_id, language, code, status)
       VALUES ($1, $2, $3, $4, 'pending')
       RETURNING *`,
      [req.user.id, problem_id, language, code],
    );
    const submission = submissionResult.rows[0];

    const problemResult = await pool.query(
      `SELECT id, slug, title, function_name, input_signature, output_signature
       FROM problems WHERE id = $1`,
      [problem_id],
    );
    const dbProblem = problemResult.rows[0];
    if (!dbProblem) return res.status(404).json({ error: 'Problem not found' });
    const catalogProblem = fallbackProblems.find((item) => item.slug === dbProblem.slug) || {};
    const problem = {
      ...dbProblem,
      function_name: dbProblem.function_name === 'solve' ? catalogProblem.function_name || dbProblem.function_name : dbProblem.function_name,
      input_signature: dbProblem.input_signature?.length ? dbProblem.input_signature : catalogProblem.inputSignature || [],
      output_signature: dbProblem.output_signature || catalogProblem.outputSignature || '',
    };

    const testsResult = await pool.query(
      'SELECT input, expected_output FROM test_cases WHERE problem_id = $1 ORDER BY id ASC',
      [problem_id],
    );

    await getQueue().add('judge', {
      submissionId: submission.id,
      language,
      code,
      tests: testsResult.rows,
      problem,
    });

    res.status(201).json(submission);
  } catch (err) {
    next(err);
  }
});

router.get('/my', requireDatabase, auth, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT s.id, s.problem_id, p.title, p.slug, s.language, s.status, s.runtime, s.error, s.created_at
       FROM submissions s
       JOIN problems p ON p.id = s.problem_id
       WHERE s.user_id = $1
       ORDER BY s.created_at DESC`,
      [req.user.id],
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', requireDatabase, auth, async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM submissions WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id],
    );
    const submission = result.rows[0];
    if (!submission) return res.status(404).json({ error: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
