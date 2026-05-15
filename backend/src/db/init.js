const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
require('dotenv').config();

async function init() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to initialize the database');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

  try {
    await pool.query(schema);
    console.log('Database schema initialized');
  } finally {
    await pool.end();
  }
}

init().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
