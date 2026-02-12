// prod-server.js
import 'dotenv/config';
import { handler } from './build/handler.js'; // The SvelteKit build output
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Allow connections from anywhere
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join the "global" room
  socket.join('global-counter');

  // Broadcast disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Make 'io' accessible to your API routes via middleware
// This lets your SvelteKit API routes say "io.emit()"
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 3. Let SvelteKit handle all web requests
app.use(handler);

// 4. Start the server on the port DO provides (or 3000)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
