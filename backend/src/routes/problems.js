const express = require('express');
const { pool, hasDatabase, requireDatabase } = require('../db');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { problems: fallbackProblems } = require('../services/problemFallback');

const router = express.Router();

function shapeProblem(row, testCases = []) {
  const catalogProblem = fallbackProblems.find((problem) => problem.slug === row.slug) || {};

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    difficulty: row.difficulty,
    tags: row.tags || [],
    starterCode: row.starter_code || {},
    functionName: row.function_name === 'solve' ? catalogProblem.function_name || row.function_name : row.function_name || 'solve',
    inputSignature: row.input_signature?.length ? row.input_signature : catalogProblem.inputSignature || [],
    outputSignature: row.output_signature || catalogProblem.outputSignature || '',
    examples: row.examples || catalogProblem.examples || [],
    constraints: row.constraints || catalogProblem.constraints || [],
    testCases,
  };
}

router.get('/', async (req, res, next) => {
  if (!hasDatabase) {
    return res.json(fallbackProblems.map((problem) => ({ ...problem, testCases: undefined })));
  }

  try {
    const result = await pool.query(
      `SELECT id, slug, title, description, difficulty, tags, starter_code, function_name
       FROM problems ORDER BY id ASC`,
    );
    res.json(result.rows.map((row) => shapeProblem(row)));
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  if (!hasDatabase) {
    const problem = fallbackProblems.find((item) => item.slug === req.params.slug);
    return problem ? res.json(problem) : res.status(404).json({ error: 'Problem not found' });
  }

  try {
    const problemResult = await pool.query('SELECT * FROM problems WHERE slug = $1', [
      req.params.slug,
    ]);
    const problem = problemResult.rows[0];

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const testsResult = await pool.query(
      `SELECT input, expected_output, is_sample
       FROM test_cases
       WHERE problem_id = $1 AND is_sample = true
       ORDER BY id ASC`,
      [problem.id],
    );

    res.json(shapeProblem(problem, testsResult.rows));
  } catch (err) {
    next(err);
  }
});

router.post('/', requireDatabase, auth, admin, async (req, res, next) => {
  const { slug, title, description, difficulty, tags = [], starterCode = {}, testCases = [] } = req.body;

  if (!slug || !title || !description || !difficulty) {
    return res.status(400).json({ error: 'slug, title, description and difficulty are required' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(
      `INSERT INTO problems (slug, title, description, difficulty, tags, starter_code)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [slug, title, description, difficulty, tags, starterCode],
    );
    const problem = result.rows[0];

    for (const testCase of testCases) {
      await client.query(
        `INSERT INTO test_cases (problem_id, input, expected_output, is_sample)
         VALUES ($1, $2, $3, $4)`,
        [problem.id, testCase.input, testCase.expected_output, Boolean(testCase.is_sample)],
      );
    }

    await client.query('COMMIT');
    res.status(201).json(shapeProblem(problem));
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
