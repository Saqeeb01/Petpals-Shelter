const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');
const User = require("../models/User");

// const secretKey = '0486f1ad645f58c319765aaf78124b141e4725e206cadbd6a8f38552e71ecee3';

const authController = {
  register: async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hashSync(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error registering user" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      res.json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging in" });
    }
  },

  // deleteUserProfile: async (req, res) => {
  //   try {
  //     const userId = req.user.userId; // User ID obtained from authenticated token

  //     // Find and delete the user's profile
  //     await User.findByIdAndDelete(userId);

  //     res.json({ message: 'User profile deleted successfully' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Error deleting user profile' });
  //   }
  // },

  // getAllUsers: async (req, res) => {
  //   try {
  //     const users = await User.find({}, '-password'); // Exclude password field
  //     res.json({ users });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Error fetching users' });
  //   }
  // },

  // updateUserProfile: async (req, res) => {
  //   try {
  //     const userId = req.user.userId; // User ID from authenticated JWT token
  //     const { firstName, lastName } = req.body;

  //     const updatedUser = await User.findByIdAndUpdate(
  //       userId,
  //       { $set: { firstName, lastName } },
  //       { new: true }
  //     );

  //     if (!updatedUser) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }

  //     res.json({ message: 'Profile updated successfully', user: updatedUser });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Error updating profile' });
  //   }
  // },

  // Other controller functions...
};

module.exports = authController;
