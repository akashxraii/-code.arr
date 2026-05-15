const express = require('express');
const { Queue } = require('bullmq');
const { pool, requireDatabase } = require('../db');
const auth = require('../middleware/auth');

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

router.post('/', requireDatabase, auth, async (req, res, next) => {
  const { problem_id, language = 'javascript', code } = req.body;

  if (!problem_id || !code) {
    return res.status(400).json({ error: 'problem_id and code are required' });
  }

  try {
    const submissionResult = await pool.query(
      `INSERT INTO submissions (user_id, problem_id, language, code, status)
       VALUES ($1, $2, $3, $4, 'pending')
       RETURNING *`,
      [req.user.id, problem_id, language, code],
    );
    const submission = submissionResult.rows[0];

    const testsResult = await pool.query(
      'SELECT input, expected_output FROM test_cases WHERE problem_id = $1 ORDER BY id ASC',
      [problem_id],
    );

    await getQueue().add('judge', {
      submissionId: submission.id,
      language,
      code,
      tests: testsResult.rows,
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
