const express = require('express');
const jwt = require('jsonwebtoken');
const { pool, requireDatabase } = require('../db');
const auth = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimits');
const { validateBody } = require('../middleware/validate');
const config = require('../config');
const { registerSchema, loginSchema } = require('../schemas');
const { hashPassword, verifyPassword } = require('../services/password');

const router = express.Router();

function signUser(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    config.jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '2h' },
  );
}

router.post('/register', authLimiter, requireDatabase, validateBody(registerSchema), async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, role`,
      [username, email, hashPassword(password)],
    );
    const user = result.rows[0];
    res.status(201).json({ user, token: signUser(user) });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    next(err);
  }
});

router.post('/login', authLimiter, requireDatabase, validateBody(loginSchema), async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token: signUser(user),
    });
  } catch (err) {
    next(err);
  }
});

router.get('/me', auth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
