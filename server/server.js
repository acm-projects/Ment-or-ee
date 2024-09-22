const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http'); // Import http
const { Server } = require('socket.io'); // Import Socket.IO

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

// Create an HTTP server and pass the Express app to it
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow connections from any origin (adjust as needed)
  }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle messages from the client
  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', data); // Broadcast the message to all clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
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
