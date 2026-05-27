const express = require('express');
const multer = require('multer');
const { pool, requireDatabase } = require('../db');
const auth = require('../middleware/auth');
const { uploadLimiter } = require('../middleware/rateLimits');
const { extractResumeText } = require('../services/resumeParser');

const router = express.Router();
const ALLOWED_RESUME_MIME_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
]);
const ALLOWED_RESUME_EXTENSIONS = new Set(['pdf', 'docx', 'txt']);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const extension = String(file.originalname || '').split('.').pop().toLowerCase();
    const mimeType = String(file.mimetype || '').toLowerCase();
    if (ALLOWED_RESUME_EXTENSIONS.has(extension) && ALLOWED_RESUME_MIME_TYPES.has(mimeType)) {
      return callback(null, true);
    }
    return callback(new Error('Unsupported resume format. Upload a PDF, DOCX, or TXT file.'));
  },
});

router.post('/upload', uploadLimiter, requireDatabase, auth, upload.single('resume'), async (req, res, next) => {
  try {
    const extractedText = await extractResumeText(req.file);
    const result = await pool.query(
      `INSERT INTO resumes (user_id, filename, mime_type, extracted_text)
       VALUES ($1, $2, $3, $4)
       RETURNING id, filename, mime_type, extracted_text, created_at`,
      [req.user.id, req.file.originalname, req.file.mimetype, extractedText],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.statusCode) {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

module.exports = router;
