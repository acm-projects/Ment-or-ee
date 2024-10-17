const User = require("../models/userModel"); // Import the user model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

/**
 * @description Log in and provide users access and refresh tokens
 * @route POST /api/auth/login
 * @access Public
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // Validate form data
  if (validator.isEmpty(email) || validator.isEmpty(password)) {
    return res.status(400).json({ message: "Please fill out both fields" });
  }

  try {
    // User not found
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser)
      return res.status(401).json({ message: "Invalid credentials" });

    // Compare password
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    // Generate access token
    const accessToken = jwt.sign(
      {
        user: {
          id: foundUser._id,
          email: foundUser.email,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Send tokens
    res.json({
      accessToken,
      refreshToken,
      email: foundUser.email,
      id: foundUser._id,
      username: foundUser.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * @description Refresh user access token using refresh token
 * @route GET /api/auth/refresh
 * @access Public
 */
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      try {
        const foundUser = await User.findById(decoded.id).exec();
        if (!foundUser)
          return res.status(401).json({ message: "Unauthorized" });

        // Generate new access token
        const accessToken = jwt.sign(
          {
            user: {
              id: foundUser._id,
              email: foundUser.email,
              role: foundUser.role,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1hr" }
        );

        res.json({
          accessToken,
          email: foundUser.email,
          username: foundUser.username,
        });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    }
  );
};

/**
 * @description Sign up users and add them to the database
 * @route POST /api/auth/signup
 * @access Public
 */
const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    dateOfBirth,
    language,
    personalityType,
    educationLevel,
    skills,
    city,
    state,
    university,
  } = req.body;
  console.log(process.env.ACCESS_TOKEN_SECRET);
  console.log(process.env.REFRESH_TOKEN_SECRET);
  // Validate form data
  if (
    validator.isEmpty(email) ||
    validator.isEmpty(password) ||
    validator.isEmpty(name)
  ) {
    return res.status(400).json({ message: "Please fill out all fields" });
  }

  if (!validator.isEmail(email))
    return res.status(400).json({ message: "Invalid email address" });
  if (!validator.isStrongPassword(password))
    return res.status(400).json({ message: "Password not strong enough" });
  if (!validator.isAlphanumeric(name))
    return res.status(400).json({ message: "Username must be alphanumeric" });

  try {
    // Check if user already exists
    const foundUser = await User.findOne({ name }).exec();
    const foundEmail = await User.findOne({ email }).exec();
    if (foundUser || foundEmail) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      dateOfBirth,
      language,
      personalityType,
      educationLevel,
      skills,
      location: { city, state },
      university,
    });
    const savedUser = await newUser.save();

    // Generate access token
    const accessToken = jwt.sign(
      {
        user: {
          id: savedUser._id,
          email: savedUser.email,
          role: savedUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: savedUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Send tokens
    res
      .status(201)
      .json({
        accessToken,
        refreshToken,
        email: savedUser.email,
        id: savedUser._id,
        name: savedUser.name,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * @description Log out users and invalidate their tokens
 * @route POST /api/auth/logout
 * @access Public
 */
const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false, // Set true in production
    sameSite: "None",
  });
  res.status(200).json({ message: "Successfully logged out" });
};

module.exports = {
  login,
  signup,
  refresh,
  logout,
};
