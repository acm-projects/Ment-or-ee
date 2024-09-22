const { io } = require("socket.io-client");

// Connect to the Socket.IO server
const socket = io('http://localhost:3000');

// Join a room
const roomId = 'room1';

socket.on('connect', () => {
  console.log(`Connected to server with id: ${socket.id}`);
  socket.emit('joinRoom', roomId);
});

// Listen for room status updates
socket.on('roomFull', (message) => {
  console.log(message);
});

// Send a message to the room after joining
socket.on('roomJoined', (message) => {
  console.log(message);
  socket.emit('message', { roomId, message: 'Hello from user!' });
});

// Listen for messages from the room
socket.on('message', (data) => {
  console.log(`Message from ${data.sender}: ${data.message}`);
});

// Handle disconnect
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
