// socket.js
const socketIo = require('socket.io');

let io;

function initIo(server) {
  io = socketIo(server, {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:3001'
      ],
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    socket.on('joinHotelRoom', (hotelId) => {
      socket.join(hotelId);
      console.log(`Hotel ${hotelId} joined room: ${hotelId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = { initIo, getIo };
