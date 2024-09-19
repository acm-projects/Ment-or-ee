// index.js (or server.js)
const express = require('express');
const app = express();

// Set a port
const port = process.env.PORT || 3000;

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://drive2winjoy:Akhrub123!@mentoree.c516s.mongodb.net/mentoree?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

console.log('Attempting to connect to MongoDB...');


