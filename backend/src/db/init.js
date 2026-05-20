const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const { problemSeeds } = require('../services/problemCatalog');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
require('dotenv').config();

async function seedProblems(pool) {
  for (const problem of problemSeeds) {
    const problemResult = await pool.query(
      `INSERT INTO problems (
         slug, title, description, difficulty, tags, starter_code, function_name,
         input_signature, output_signature, examples, constraints
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (slug) DO UPDATE SET
         title = EXCLUDED.title,
         description = EXCLUDED.description,
         difficulty = EXCLUDED.difficulty,
         tags = EXCLUDED.tags,
         starter_code = EXCLUDED.starter_code,
         function_name = EXCLUDED.function_name,
         input_signature = EXCLUDED.input_signature,
         output_signature = EXCLUDED.output_signature,
         examples = EXCLUDED.examples,
         constraints = EXCLUDED.constraints
       RETURNING id`,
      [
        problem.slug,
        problem.title,
        problem.description,
        problem.difficulty,
        problem.tags,
        problem.starter_code,
        problem.function_name,
        JSON.stringify(problem.inputSignature || []),
        problem.outputSignature || '',
        JSON.stringify(problem.examples || []),
        problem.constraints || [],
      ],
    );
    const problemId = problemResult.rows[0].id;

    for (const testCase of problem.testCases || []) {
      await pool.query(
        `INSERT INTO test_cases (problem_id, input, expected_output, is_sample)
         SELECT $1, $2, $3, $4
         WHERE NOT EXISTS (
           SELECT 1 FROM test_cases
           WHERE problem_id = $1 AND input = $2
         )`,
        [problemId, testCase.input, testCase.expected_output, Boolean(testCase.is_sample)],
      );
    }
  }
}

async function init() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to initialize the database');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

  try {
    await pool.query(schema);
    await seedProblems(pool);
    console.log('Database schema initialized');
  } finally {
    await pool.end();
  }
}

init().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
