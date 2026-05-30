const config = require('./config');
const app = require('./app');
const http = require('http');
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');
const { pool } = require('./db');

const PORT = config.port;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.frontendOrigins,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error('Authentication required'));
  }

  try {
    socket.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    next(new Error('Invalid or expired token'));
  }
});

io.on('connection', (socket) => {
  socket.on('join:session', async (sessionId) => {
    if (!sessionId || !pool) return;

    try {
      const result = await pool.query(
        'SELECT id FROM interview_sessions WHERE id = $1 AND user_id = $2',
        [sessionId, socket.user.id],
      );

      if (!result.rows[0]) {
        socket.emit('join:error', { error: 'Interview not found' });
        return;
      }

      socket.join(`interview:${sessionId}`);
    } catch {
      socket.emit('join:error', { error: 'Could not join interview session' });
    }
  });
});

app.set('io', io);

server.listen(PORT, () => {
  console.log(`code.arr API running on port ${PORT}`);
});
