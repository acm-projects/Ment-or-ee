const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Add body-parser to handle POST requests
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Set a port
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://drive2winjoy:Akhrub123!@mentoree.c516s.mongodb.net/mentoree?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

