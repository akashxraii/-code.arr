const rateLimit = require('express-rate-limit');

function limiter(options) {
  return rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Try again later.' },
    ...options,
  });
}

module.exports = {
  authLimiter: limiter({ windowMs: 15 * 60 * 1000, limit: 20 }),
  runLimiter: limiter({ windowMs: 60 * 1000, limit: 20 }),
  submissionLimiter: limiter({ windowMs: 60 * 1000, limit: 10 }),
  uploadLimiter: limiter({ windowMs: 15 * 60 * 1000, limit: 10 }),
  interviewLimiter: limiter({ windowMs: 60 * 1000, limit: 30 }),
};
