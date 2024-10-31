require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const { findMatchingMentors } = require('./algorithm');
const MenteeModel = require('./models/menteeModel');
const methodOverride = require('method-override');
// const passport = require('./middleware/passport');
// const googleOAuthRoutes = require('./routes/authentication/google-oauth.routes');


const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5000', // Allow specific domain
  methods: ['GET', 'POST'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set a port
const port = process.env.PORT || 5000;

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


/*async function matchMentorToMentee(menteeId) {
  try {
    const mentee = await MenteeModel.findById(menteeId);

    if (!mentee) {
      console.log('Mentee not found');
      return;
    }

    const matchedMentors = await findMatchingMentors(mentee);
    
    console.log('Top Matches:', matchedMentors);
  } catch (error) {
    console.error('Error matching mentors:', error);
  }
}*/

// API endpoint to match a mentor to a mentee by their ID
app.post('/api/matchMentorToMentee', async (req, res) => {
  const { menteeId } = req.body;

  try {
    const mentee = await MenteeModel.findById(menteeId);

    if (!mentee) {
      return res.status(404).json({ message: 'Mentee not found' });
    }

    const matchedMentors = await findMatchingMentors(mentee);

    if (matchedMentors.length === 0) {
      return res.status(404).json({ message: 'No matching mentors found' });
    }

    return res.status(200).json({ matchedMentors });
  } catch (error) {
    console.error('Error matching mentors:', error);
    return res.status(500).json({ message: 'Error matching mentors' });
  }
});


// Define basic routes
app.get('/', (req, res) => {
  res.send('Hello world!');
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

const filesRoute = require('./routes/files.routes');
app.use('/files', filesRoute);

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


//Auth routes
const storeAuthRoutes = require('./routes/authenication/store-auth.routes');
app.use('/api/authenication/store-auth', storeAuthRoutes);

const session = require('express-session');
const { google } = require('googleapis');



// Google OAuth2 credentials
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Middleware for session management
app.use(session({
  secret: 'yo', // Replace with a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 // 1 day (adjust as needed)
  }
}));



// Routes
app.get('/auth/google', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });
    console.log('Redirecting to Google OAuth URL:', authUrl);
    res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  console.log('Received authorization code:', code);
  try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);
      
      // Store tokens in session
      req.session.tokens = tokens;
      console.log('Tokens successfully retrieved and stored in session:', req.session.tokens);
      console.log('Current session after storing tokens:', req.session);
      
      res.send('Google Calendar authorization successful! You can now create events.');
  } catch (error) {
      console.error('Error retrieving access token:', error);
      res.status(500).send('Authentication failed');
  }
});


app.post('/tasks', async (req, res) => {
    console.log('Received request to create task');
    console.log('Current session:', req.session); // Log entire session object

    // Check if the user is authenticated
    if (!req.session.tokens) {
        console.log('Tokens not found in session. User is not authenticated.'); // Log error for debugging
        return res.status(401).send('User not authenticated with Google');
    }

    // Check if the token has expired
    const tokenExpiryDate = req.session.tokens.expiry_date;
    console.log('Token expiry date:', tokenExpiryDate);
    if (tokenExpiryDate <= Date.now()) {
        console.log('Access token has expired. Attempting to refresh token...');
        try {
            const { credentials } = await oAuth2Client.refreshAccessToken(); // Use credentials to get new tokens
            req.session.tokens = credentials; // Update session with new tokens
            oAuth2Client.setCredentials(credentials); // Set new credentials
            console.log('Tokens refreshed and stored in session:', req.session.tokens);
        } catch (error) {
            console.error('Error refreshing access token:', error);
            return res.status(401).send('Failed to refresh access token');
        }
    } else {
        console.log('Access token is still valid. Proceeding to create event.');
    }

    // Set the credentials for the API call
    oAuth2Client.setCredentials(req.session.tokens);

    // Set up the calendar API
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    // Define the event you want to create
    const event = {
        summary: 'New Event',
        location: '123 Example St.',
        description: 'This is a test event',
        start: {
            dateTime: '2024-10-31T10:00:00-07:00', // Adjust to your desired time
        },
        end: {
            dateTime: '2024-10-31T11:00:00-07:00', // Adjust to your desired time
        },
    };
    console.log('Event details:', event);

    try {
        // Attempt to create the event
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        console.log('Event created successfully:', response.data);
        res.send('Event created: ' + response.data.htmlLink);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Failed to create event');
    }
});