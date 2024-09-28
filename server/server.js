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
mongoose.connect('mongodb+srv://drive2winjoy:Akhrub123!@mentoree.c516s.mongodb.net/mentoree?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const userRoutes = require('./routes/users.routes'); // Adjust the path as needed
app.use('/api/users', userRoutes);


const reviewRoutes = require('./routes/review.routes'); // Adjust the path as needed
app.use('/api/reviews', reviewRoutes);

const taskRoutes = require('./routes/task.routes'); // Ensure this matches your folder name casing
app.use('/api/tasks', taskRoutes);


const menteeRoutes = require('./routes/mentee.routes'); // Adjust the path as needed
app.use('/api/mentees', menteeRoutes);


const mentorRoutes = require('./routes/mentor.routes'); // Import the mentor routes
app.use('/mentors', mentorRoutes); // Use the mentor routes for /mentors path

const authRoutes = require('./routes/store-auth.routes');
app.use('/api/auth', authRoutes);
