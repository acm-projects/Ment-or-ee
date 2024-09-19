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
