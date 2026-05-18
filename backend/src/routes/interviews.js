const express = require('express');
const { pool, requireDatabase } = require('../db');
const auth = require('../middleware/auth');
const { streamInterviewSpeech } = require('../services/elevenLabsClient');
const { generateQuestion, generateFeedback } = require('../services/geminiClient');

const router = express.Router();

async function loadSession(id, userId) {
  const sessionResult = await pool.query(
    `SELECT i.*, r.extracted_text
     FROM interview_sessions i
     LEFT JOIN resumes r ON r.id = i.resume_id
     WHERE i.id = $1 AND i.user_id = $2`,
    [id, userId],
  );
  return sessionResult.rows[0];
}

async function loadMessages(sessionId) {
  const result = await pool.query(
    'SELECT role, content, event_type, created_at FROM interview_messages WHERE session_id = $1 ORDER BY id ASC',
    [sessionId],
  );
  return result.rows;
}

router.post('/', requireDatabase, auth, async (req, res, next) => {
  const { domain, resumeId } = req.body;

  if (!domain || !resumeId) {
    return res.status(400).json({ error: 'domain and resumeId are required' });
  }

  try {
    const resumeResult = await pool.query(
      'SELECT * FROM resumes WHERE id = $1 AND user_id = $2',
      [resumeId, req.user.id],
    );
    const resume = resumeResult.rows[0];
    if (!resume) return res.status(404).json({ error: 'Resume not found' });

    const question = await generateQuestion({
      domain,
      resumeText: resume.extracted_text,
      history: [],
    });

    const sessionResult = await pool.query(
      `INSERT INTO interview_sessions (user_id, resume_id, domain, status, current_question, started_at)
       VALUES ($1, $2, $3, 'active', $4, NOW())
       RETURNING *`,
      [req.user.id, resumeId, domain, question],
    );
    const session = sessionResult.rows[0];

    await pool.query(
      `INSERT INTO interview_messages (session_id, role, content)
       VALUES ($1, 'ai', $2)`,
      [session.id, question],
    );

    res.status(201).json({ session, question });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/answer', requireDatabase, auth, async (req, res, next) => {
  const { answer } = req.body;

  if (!answer) {
    return res.status(400).json({ error: 'answer is required' });
  }

  try {
    const session = await loadSession(req.params.id, req.user.id);
    if (!session) return res.status(404).json({ error: 'Interview not found' });

    await pool.query(
      `INSERT INTO interview_messages (session_id, role, content)
       VALUES ($1, 'user', $2)`,
      [session.id, answer],
    );

    const history = await loadMessages(session.id);
    const question = await generateQuestion({
      domain: session.domain,
      resumeText: session.extracted_text,
      history,
      answer,
    });

    await pool.query(
      `INSERT INTO interview_messages (session_id, role, content)
       VALUES ($1, 'ai', $2)`,
      [session.id, question],
    );
    await pool.query('UPDATE interview_sessions SET current_question = $1 WHERE id = $2', [
      question,
      session.id,
    ]);

    res.json({ question });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/speech', requireDatabase, auth, async (req, res, next) => {
  try {
    const session = await loadSession(req.params.id, req.user.id);
    if (!session) return res.status(404).json({ error: 'Interview not found' });

    const speech = await streamInterviewSpeech(session.current_question);
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', speech.contentType);
    speech.stream.on('error', next);
    speech.stream.pipe(res);
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
});

router.post('/:id/silence', requireDatabase, auth, async (req, res, next) => {
  try {
    const session = await loadSession(req.params.id, req.user.id);
    if (!session) return res.status(404).json({ error: 'Interview not found' });

    await pool.query(
      `INSERT INTO interview_messages (session_id, role, content, event_type)
       VALUES ($1, 'system', 'Candidate was silent for the configured timeout.', 'silence')`,
      [session.id],
    );

    const history = await loadMessages(session.id);
    const question = await generateQuestion({
      domain: session.domain,
      resumeText: session.extracted_text,
      history,
      silence: true,
    });

    await pool.query(
      `INSERT INTO interview_messages (session_id, role, content)
       VALUES ($1, 'ai', $2)`,
      [session.id, question],
    );
    await pool.query('UPDATE interview_sessions SET current_question = $1 WHERE id = $2', [
      question,
      session.id,
    ]);

    res.json({ question });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/finish', requireDatabase, auth, async (req, res, next) => {
  try {
    const session = await loadSession(req.params.id, req.user.id);
    if (!session) return res.status(404).json({ error: 'Interview not found' });

    const history = await loadMessages(session.id);
    const feedback = await generateFeedback({
      domain: session.domain,
      resumeText: session.extracted_text,
      history,
    });

    const feedbackResult = await pool.query(
      `INSERT INTO interview_feedback (session_id, strengths, improvements, summary, score)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [session.id, feedback.strengths, feedback.improvements, feedback.summary, feedback.score],
    );

    await pool.query(
      `UPDATE interview_sessions
       SET status = 'finished', finished_at = NOW()
       WHERE id = $1`,
      [session.id],
    );

    res.json({ feedback: feedbackResult.rows[0] });
  } catch (err) {
    next(err);
  }
});

router.get('/my', requireDatabase, auth, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT i.*, f.score
       FROM interview_sessions i
       LEFT JOIN interview_feedback f ON f.session_id = i.id
       WHERE i.user_id = $1
       ORDER BY i.created_at DESC`,
      [req.user.id],
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', requireDatabase, auth, async (req, res, next) => {
  try {
    const session = await loadSession(req.params.id, req.user.id);
    if (!session) return res.status(404).json({ error: 'Interview not found' });

    const messages = await loadMessages(session.id);
    const feedbackResult = await pool.query(
      'SELECT * FROM interview_feedback WHERE session_id = $1 ORDER BY id DESC LIMIT 1',
      [session.id],
    );

    res.json({
      session,
      messages,
      feedback: feedbackResult.rows[0] || null,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
