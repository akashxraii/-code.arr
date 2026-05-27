const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');

const authRoutes = require('./routes/auth');
const problemRoutes = require('./routes/problems');
const runRoutes = require('./routes/run');
const submissionRoutes = require('./routes/submissions');
const resumeRoutes = require('./routes/resumes');
const interviewRoutes = require('./routes/interviews');

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(cors({
  origin(origin, callback) {
    if (!origin || config.frontendOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS origin is not allowed'));
  },
}));
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.json({ message: 'code.arr API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/run', runRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/interviews', interviewRoutes);

app.use((err, req, res, next) => {
  if (err.message === 'CORS origin is not allowed') {
    return res.status(403).json({ error: 'CORS origin is not allowed' });
  }
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'Uploaded file is too large' });
  }
  if (err.message === 'Unsupported resume format. Upload a PDF, DOCX, or TXT file.') {
    return res.status(400).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

module.exports = app;
