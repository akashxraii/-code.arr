const { Pool } = require('pg');

const hasDatabase = Boolean(process.env.DATABASE_URL);

const pool = hasDatabase
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

function requireDatabase(req, res, next) {
  if (!pool) {
    return res.status(503).json({
      error: 'DATABASE_URL is required for this feature',
    });
  }

  next();
}

module.exports = {
  pool,
  hasDatabase,
  requireDatabase,
};
