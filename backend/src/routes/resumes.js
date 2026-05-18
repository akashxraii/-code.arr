const express = require('express');
const multer = require('multer');
const { pool, requireDatabase } = require('../db');
const auth = require('../middleware/auth');
const { extractResumeText } = require('../services/resumeParser');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
});

router.post('/upload', requireDatabase, auth, upload.single('resume'), async (req, res, next) => {
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
