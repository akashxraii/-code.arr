const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config();

function parseOrigins(value) {
  return String(value || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

const config = {
  port: Number(process.env.PORT || 5000),
  jwtSecret: requireEnv('JWT_SECRET'),
  frontendOrigins: parseOrigins(process.env.FRONTEND_URL),
  nodeEnv: process.env.NODE_ENV || 'development',
};

module.exports = config;
