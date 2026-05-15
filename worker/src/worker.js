const { Worker } = require('bullmq');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config();

const { judgeSubmission } = require('./runner');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const redisConnection = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT || 6379),
};

const worker = new Worker(
  'submissions',
  async (job) => {
    const { submissionId, language, code, tests } = job.data;

    await pool.query('UPDATE submissions SET status = $1 WHERE id = $2', [
      'running',
      submissionId,
    ]);

    try {
      const verdict = judgeSubmission({ language, code, tests });
      await pool.query(
        'UPDATE submissions SET status = $1, runtime = $2, error = $3 WHERE id = $4',
        [verdict.status, verdict.runtime, verdict.error || null, submissionId],
      );
    } catch (err) {
      await pool.query(
        'UPDATE submissions SET status = $1, error = $2 WHERE id = $3',
        ['runtime_error', err.message, submissionId],
      );
      throw err;
    }
  },
  {
    connection: redisConnection,
    concurrency: 2,
  },
);

worker.on('completed', (job) => {
  console.log(`Submission job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Submission job ${job?.id} failed: ${err.message}`);
});

console.log('TechnoCode worker is waiting for submission jobs...');
