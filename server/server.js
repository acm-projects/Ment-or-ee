const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http'); 
const { Server } = require('socket.io'); 

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set a port
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://drive2winjoy:Akhrub123!@mentoree.c516s.mongodb.net/mentoree?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Create an HTTP server and attach the Express app
const server = http.createServer(app);

// Initialize Socket.IO and set up CORS
const io = new Server(server, {
  cors: {
    origin: "*", 
  }
});

// Store rooms and track user connections
const rooms = {};

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle joining a room
  socket.on('joinRoom', ({ mentorId, menteeId }) => {
    const roomId = `${mentorId}_${menteeId}`; // Unique room ID for each mentor-mentee pair

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    
    if (rooms[roomId].length < 2) {
      rooms[roomId].push(socket.id);
      socket.join(roomId);
      console.log(`${socket.id} joined room: ${roomId}`);
      socket.emit('roomJoined', `You have joined room ${roomId}`);
      
      // Notify the other user in the room if it's now full
      if (rooms[roomId].length === 2) {
        io.to(roomId).emit('roomFull', `Room ${roomId} is now full.`);
      }
    } else {
      socket.emit('roomFull', `Room ${roomId} is full.`);
    }
  });

  // Handle messages from the client
  socket.on('message', ({ roomId, message }) => {
    console.log(`Message from ${socket.id} in room ${roomId}: ${message}`);
    // Include mentorId in the message data
    const mentorId = roomId.split('_')[0]; // Extract mentorId from roomId
    io.to(roomId).emit('message', { sender: socket.id, message, mentorId });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Remove user from rooms they were in
    for (const roomId in rooms) {
      const index = rooms[roomId].indexOf(socket.id);
      if (index !== -1) {
        rooms[roomId].splice(index, 1);
        console.log(`${socket.id} left room: ${roomId}`);
        if (rooms[roomId].length === 0) {
          delete rooms[roomId]; // Remove the room if empty
        } else {
          // Notify remaining users in the room that someone has left
          io.to(roomId).emit('userLeft', `${socket.id} has left the room.`);
        }
      }
    }
  });
});

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const userRoutes = require('./routes/user.routes'); // Adjust the path as needed
app.use('/api/users', userRoutes);


const reviewRoutes = require('./routes/review.route'); // Adjust the path as needed
app.use('/api/reviews', reviewRoutes);

const taskRoutes = require('./routes/task.routes'); // Ensure this matches your folder name casing
app.use('/api/tasks', taskRoutes);


const menteeRoutes = require('./routes/mentee.routes'); // Adjust the path as needed
app.use('/api/mentees', menteeRoutes);
