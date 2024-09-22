const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Add body-parser to handle POST requests
const TaskModel = require('./models/taskModel'); // Import your task model
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

// POST route to create a task
app.post('/tasks', (req, res) => {
  console.log(req.body); // Log the request body
  const newTask = new TaskModel(req.body);
  newTask.save()
    .then(() => res.status(201).send('Task created successfully'))
    .catch(err => res.status(400).send('Error creating task: ' + err));
});

// GET route to fetch tasks
app.get('/tasks', (req, res) => {
  TaskModel.find()
    .then(tasks => res.json(tasks)) // Send tasks as JSON
    .catch(err => res.status(500).send('Error retrieving tasks: ' + err));
});
