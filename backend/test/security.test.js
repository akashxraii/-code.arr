const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const config = require('../src/config');
const { problemCreateSchema } = require('../src/schemas');

function token() {
  return jwt.sign(
    { id: 1, username: 'security', email: 'security@example.com', role: 'user' },
    config.jwtSecret,
    { expiresIn: '5m' },
  );
}

test('POST /api/run requires authentication', async () => {
  const response = await request(app)
    .post('/api/run')
    .send({ problemSlug: 'two-sum', language: 'javascript', code: 'function solve() {}' });

  assert.equal(response.status, 401);
});

test('POST /api/run rejects unsupported languages before execution', async () => {
  const response = await request(app)
    .post('/api/run')
    .set('Authorization', `Bearer ${token()}`)
    .send({ problemSlug: 'two-sum', language: 'bash', code: 'echo bad' });

  assert.equal(response.status, 400);
  assert.equal(response.body.error, 'Invalid request body');
});

test('POST /api/resumes/upload rejects unsupported file types', async () => {
  const response = await request(app)
    .post('/api/resumes/upload')
    .set('Authorization', `Bearer ${token()}`)
    .attach('resume', Buffer.from('not a resume'), {
      filename: 'resume.exe',
      contentType: 'application/octet-stream',
    });

  assert.equal(response.status, 400);
});

test('POST /api/resumes/upload rejects oversized files', async () => {
  const oversized = Buffer.alloc(2 * 1024 * 1024 + 1, 'a');
  const response = await request(app)
    .post('/api/resumes/upload')
    .set('Authorization', `Bearer ${token()}`)
    .attach('resume', oversized, {
      filename: 'resume.txt',
      contentType: 'text/plain',
    });

  assert.equal(response.status, 400);
});

test('problem creation schema rejects coding platform tags', () => {
  const result = problemCreateSchema.safeParse({
    slug: 'sample-problem',
    title: 'Sample Problem',
    description: 'Solve the sample problem.',
    difficulty: 'easy',
    tags: ['Array', 'LeetCode'],
    testCases: [],
  });

  assert.equal(result.success, false);
});
