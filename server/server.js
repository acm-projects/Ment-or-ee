require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const { matchMenteeToMentors } = require('./algorithm');
const taskController = require('./controllers/task.controller'); // Adjust path as needed
const MentorModel = require('./models/mentorModel'); // Adjust the path as necessary
const MenteeModel = require('./models/menteeModel');
const methodOverride = require('method-override');
// const passport = require('./middleware/passport');
// const googleOAuthRoutes = require('./routes/authentication/google-oauth.routes');

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Allow specific domain
    methods: ["GET", "POST"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Set a port
const port = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create an HTTP server and attach the Express app
const server = http.createServer(app);

// Initialize Socket.IO and set up CORS
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Store rooms and track user connections
const rooms = {};

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle joining a room
  socket.on("joinRoom", ({ mentorId, menteeId }) => {
    const roomId = `${mentorId}_${menteeId}`; // Unique room ID for each mentor-mentee pair

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    if (rooms[roomId].length < 2) {
      rooms[roomId].push(socket.id);
      socket.join(roomId);
      console.log(`${socket.id} joined room: ${roomId}`);
      socket.emit("roomJoined", `You have joined room ${roomId}`);

      // Notify the other user in the room if it's now full
      if (rooms[roomId].length === 2) {
        io.to(roomId).emit("roomFull", `Room ${roomId} is now full.`);
      }
    } else {
      socket.emit("roomFull", `Room ${roomId} is full.`);
    }
  });

  // Handle messages from the client
  socket.on("message", ({ roomId, message }) => {
    console.log(`Message from ${socket.id} in room ${roomId}: ${message}`);
    io.to(roomId).emit("message", { sender: socket.id, message });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // Remove user from rooms they were in
    for (const roomId in rooms) {
      const index = rooms[roomId].indexOf(socket.id);
      if (index !== -1) {
        rooms[roomId].splice(index, 1);
        console.log(`${socket.id} left room: ${roomId}`);
        if (rooms[roomId].length === 0) {
          delete rooms[roomId]; // Remove the room if empty
        } else {
          io.to(roomId).emit("userLeft", `${socket.id} has left the room.`);
        }
      }
    }
  });
});

const router = express.Router();

router.post('/addMenteeToMentor', async (req, res) => {
  const { mentorId, menteeId } = req.body;

  try {
    // Find the mentor by ID and add the mentee ID to their mentees array
    const mentor = await MentorModel.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    
    // Add mentee ID if it does not already exist
    if (!mentor.mentees.includes(menteeId)) {
      mentor.mentees.push(menteeId);
      await mentor.save();
    }

    // Find the mentee by ID and add the mentor ID to their mentors array
    const mentee = await MenteeModel.findById(menteeId);
    if (!mentee) {
      return res.status(404).json({ message: "Mentee not found" });
    }

    // Add mentor ID if it does not already exist
    if (!mentee.mentors.includes(mentorId)) {
      mentee.mentors.push(mentorId);
      await mentee.save();
    }

    res.status(200).json({ message: 'Mentee added to mentor successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;

// Function to get MenteeId based on UserId
const getMenteeIdByUserId = async (userId) => {
  try {
    // Query MenteeModel to find the mentee based on userId
    const mentee = await MenteeModel.findOne({ user: userId }).exec();

    // If mentee is found, return the menteeId
    if (mentee) {
      return mentee._id;
    } else {
      throw new Error('Mentee not found for the provided userId');
    }
  } catch (error) {
    console.error(error);  // Log the error
    throw new Error('Error retrieving menteeId');
  }
};
app.get('/api/match/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Step 1: Get the menteeId using the userId
    const menteeId = await getMenteeIdByUserId(userId);

    // Step 2: Find the mentee and populate the user details
    const mentee = await MenteeModel.findById(menteeId).populate('user');
    if (!mentee) {
      return res.status(404).json({ success: false, message: 'Mentee not found' });
    }

    // Step 3: Fetch all mentors and populate user details for each
    const mentors = await MentorModel.find().populate('user');

    // Step 4: Get the matched mentors
    const matchedMentors = await matchMenteeToMentors(mentee, mentors);

    // Send response with matched mentors
    res.json({
      success: true,
      matchedMentors: matchedMentors.map(match => {
        // Check if mentor.user exists before trying to access its properties
        const mentorUser = match.mentor.user || {};

        return {
          mentorId: match.mentor._id,
          name: mentorUser.name || 'Unknown',  // Default if name is missing
          score: match.score,  // Include the calculated score
          location: mentorUser.location || 'Unknown location',  // Default if location is missing
          languages: mentorUser.languages || [],
          fields: mentorUser.fields || [],
          industries: mentorUser.industries || [],
          university: mentorUser.university || 'Unknown university',
          personalityType: mentorUser.personalityType || 'Unknown',
        };
      })
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});




// Define basic routes
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// User routes
const userRoutes = require("./routes/users.routes");
app.use("/api/users", userRoutes);

// Review routes
const reviewRoutes = require("./routes/review.routes");
app.use("/api/reviews", reviewRoutes);

// Task routes
const taskRoutes = require("./routes/task.routes");
app.use("/api/tasks", taskRoutes);

// Mentee routes
const menteeRoutes = require("./routes/mentee.routes");
app.use("/api/mentees", menteeRoutes);

// Mentor routes
const mentorRoutes = require("./routes/mentor.routes");
app.use("/api/mentors", mentorRoutes);

// Meeting routes
const meetingRoutes = require("./routes/meeting.routes");
app.use("/api/meetings", meetingRoutes);

const filesRoute = require('./routes/files.routes');
app.use('/files', filesRoute);


app.get('/tasks/assigned/:userId', taskController.getTasksAssignedToMentee);

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Auth routes
const storeAuthRoutes = require("./routes/authenication/store-auth.routes");
app.use("/api/authenication/store-auth", storeAuthRoutes);

