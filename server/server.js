require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');

//const MenteeModel = require('./models/menteeModel.js'); // Import Mentee model
//const MentorModel = require('./models/mentorModel.js'); // Import Mentor model

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set a port
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

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
    io.to(roomId).emit('message', { sender: socket.id, message });
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
          io.to(roomId).emit('userLeft', `${socket.id} has left the room.`);
        }
      }
    }
  });
});



// Define basic routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User routes
const userRoutes = require('./routes/users.routes'); 
app.use('/api/users', userRoutes);

// Review routes
const reviewRoutes = require('./routes/review.routes'); 
app.use('/api/reviews', reviewRoutes);

// Task routes
const taskRoutes = require('./routes/task.routes'); 
app.use('/api/tasks', taskRoutes);

// Mentee routes
const menteeRoutes = require('./routes/mentee.routes'); 
app.use('/api/mentees', menteeRoutes);

// Mentor routes
const mentorRoutes = require('./routes/mentor.routes'); 
app.use('/api/mentors', mentorRoutes);

// Meeting routes
const meetingRoutes = require('./routes/meeting.routes'); 
app.use('/api/meetings', meetingRoutes);

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


