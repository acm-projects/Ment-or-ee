const User = require('../models/userModel'); // Import the user model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

/**
 * @description Log in and provide users access and refresh tokens
 * @route POST /api/auth/login
 * @access Public
 */
const login = async (req, res) => {
    
    const { email, password } = req.body;
    console.log(req.body)
    // Validate form data
    if (validator.isEmpty(email) || validator.isEmpty(password)) {
        return res.status(400).json({ message: 'Please fill out both fields' });
    }

    try {
        // User not found
        const foundUser = await User.findOne({ email }).exec();
        if (!foundUser) return res.status(401).json({ message: 'Invalid credentials' });

        // Compare password
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate access token
        const accessToken = jwt.sign(
            {
                "user": {
                    "id": foundUser._id,
                    "email": foundUser.email,
                    "role": foundUser.role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1hr' }
        );

        // Generate refresh token
        const refreshToken = jwt.sign(
            { "id": foundUser._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Send tokens
        res.json({ accessToken, refreshToken, email: foundUser.email, id: foundUser._id, username: foundUser.username });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * @description Refresh user access token using refresh token
 * @route GET /api/auth/refresh
 * @access Public
 */
const refresh = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        try {
            const foundUser = await User.findById(decoded.id).exec();
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

            // Generate new access token
            const accessToken = jwt.sign(
                {
                    "user": {
                        "id": foundUser._id,
                        "email": foundUser.email,
                        "role": foundUser.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1hr' }
            );

            res.json({ accessToken, email: foundUser.email, username: foundUser.username });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    });
};

// /**
//  * @description Sign up users and add them to the database
//  * @route POST /api/auth/signup
//  * @access Public
//  */
// const signup = async (req, res) => {
//     const { name, email, password, role, dateOfBirth, language, personalityType, educationLevel, skills, city,state, university } = req.body;
//     console.log(process.env.ACCESS_TOKEN_SECRET)
//     console.log(process.env.REFRESH_TOKEN_SECRET)
//     // Validate form data
//     if (validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(name)) {
//         return res.status(400).json({ message: 'Please fill out all fields' });
//     }

//     if (!validator.isEmail(email)) return res.status(400).json({ message: 'Invalid email address' });
//     if (!validator.isStrongPassword(password)) return res.status(400).json({ message: 'Password not strong enough' });
//     if (!validator.isAlphanumeric(name)) return res.status(400).json({ message: 'Username must be alphanumeric' });

//     try {
//         // Check if user already exists
//         const foundUser = await User.findOne({name }).exec();
//         const foundEmail = await User.findOne({ email }).exec();
//         if (foundUser || foundEmail) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create new user
//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//             role,
//             dateOfBirth,
//             language,
//             personalityType,
//             educationLevel,
//             skills,
//             location: {city, state},
//             university
//         });
//         const savedUser = await newUser.save();

//         // Generate access token
//         const accessToken = jwt.sign(
//             {
//                 "user": {
//                     "id": savedUser._id,
//                     "email": savedUser.email,
//                     "role": savedUser.role
//                 }
//             },
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: '1hr' }
//         );

//         // Generate refresh token
//         const refreshToken = jwt.sign(
//             { "id": savedUser._id },
//             process.env.REFRESH_TOKEN_SECRET,
//             { expiresIn: '1d' }
//         );

//         // Send tokens
//         res.status(201).json({ accessToken, refreshToken, email: savedUser.email, id: savedUser._id, name: savedUser.name });
//     } catch (error) {
//         console.log( error)
//         res.status(500).json({ message: 'Internal Server Error', error });
//     }
    
// };
const MentorModel = require('../models/mentorModel'); // Import Mentor model
const MenteeModel = require('../models/menteeModel'); // Import Mentee model

/**
* @description Sign up users and add them to the database
* @route POST /api/auth/signup
* @access Public
*/
const signupBasic = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate basic user data
    if (validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(name)) {
        return res.status(400).json({ message: 'Please fill out all fields' });
    }

    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Invalid email address' });
    if (!validator.isStrongPassword(password)) return res.status(400).json({ message: 'Password not strong enough' });
    //if (!validator.isAlphanumeric(name)) return res.status(400).json({ message: 'Username must be alphanumeric' });

    try {
        // Check if user already exists
        const foundEmail = await User.findOne({ email }).exec();
        if (foundEmail) return res.status(400).json({ message: 'User with this email already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create basic user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();

        // Generate access token
        const accessToken = jwt.sign(
            { "user": { "id": savedUser._id, "email": savedUser.email } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1hr' }
        );

        res.status(201).json({ accessToken, email: savedUser.email, id: savedUser._id, name: savedUser.name });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// // Complete Sign-Up
// const signupComplete = async (req, res) => {
//     const { userId, role, language, personalityType, educationLevel, skills, city, state, university, major, collegeYear, company, jobTitle, degrees } = req.body;

//     // Validate the role
//     if (!['Mentee', 'Mentor'].includes(role)) {
//         return res.status(400).json({ message: 'Invalid role' });
//     }

//     try {
//         const user = await User.findById(userId).exec();
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         // Update common user fields
//         user.role = role;
//         //user.dateOfBirth = dateOfBirth;
//         user.language = language;
//         user.personalityType = personalityType;
//         user.educationLevel = educationLevel;
//         user.skills = skills;
//         user.location = { city, state };
//         user.university = university;

//         // If the role is Mentee, create Mentee-specific fields
//         if (role === 'Mentee') {
//             const newMentee = new MenteeModel({
//                 user: user._id, // Foreign key to the user
//                 major,
//                 collegeYear
//             });
//             await newMentee.save();
//         }

//         // If the role is Mentor, create Mentor-specific fields
//         if (role === 'Mentor') {
//             const newMentor = new MentorModel({
//                 user: user._id, // Foreign key to the user
//                 company,
//                 jobTitle,
//                 degrees
//             });
//             await newMentor.save();
//         }

//         await user.save();

//         res.status(200).json({ message: 'User profile updated successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error', error });
//     }
// };


const signupComplete = async (req, res) => {
    const {
        userId, role, language, personalityType,
        educationLevel,fields, city, state, university,
        major = 'Undeclared', collegeYear = 'First Year', // Default values for Mentee
        company = 'N/A', jobTitle = 'N/A', degrees = ['None'] // Default values for Mentor
    } = req.body;

    // Validate the role
    if (!['Mentee', 'Mentor'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        // Find the existing user
        const user = await UserModel.findById(userId).exec();
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update common user fields
        user.role = role;
        user.fields = fields || user.fields; // Retain existing value if not provided
        user.language = language || user.language; // Retain existing value if not provided
        user.personalityType = personalityType || user.personalityType; // Retain existing value if not provided
        user.educationLevel = educationLevel || user.educationLevel; // Retain existing value if not provided
        user.skills = skills || user.skills; // Retain existing value if not provided
        user.location = { city: city || user.location.city, state: state || user.location.state };
        user.university = university || user.university; // Retain existing value if not provided

        // Save common user fields
        await user.save();

        // If the role is Mentee, update or create Mentee-specific fields
        if (role === 'Mentee') {
            let mentee = await MenteeModel.findOne({ user: user._id }).exec();
            if (mentee) {
                mentee.major = major;
                mentee.collegeYear = collegeYear;
            } else {
                mentee = new MenteeModel({
                    user: user._id, // Foreign key to the user
                    major,
                    collegeYear
                });
            }
            await mentee.save();
        }

        // If the role is Mentor, update or create Mentor-specific fields
        if (role === 'Mentor') {
            let mentor = await MentorModel.findOne({ user: user._id }).exec();
            if (mentor) {
                mentor.company = company;
                mentor.jobTitle = jobTitle;
                mentor.degrees = degrees;
            } else {
                mentor = new MentorModel({
                    user: user._id, // Foreign key to the user
                    company,
                    jobTitle,
                    degrees
                });
            }
            await mentor.save();
        }

        // Send success response
        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

/**
 * @description Log out users and invalidate their tokens
 * @route POST /api/auth/logout
 * @access Public
 */
const logout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: false,  // Set true in production
        sameSite: 'None'
    });
    res.status(200).json({ message: 'Successfully logged out' });
};

module.exports = {
    login,
    signupBasic,
    signupComplete,
    refresh,
    logout
};
