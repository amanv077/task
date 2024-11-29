// import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";

// Helper function to send a standardized error response
const sendErrorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({ success: false, message });
};

// Register a new user
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return sendErrorResponse(res, "All fields are required.", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendErrorResponse(res, "Email already in use.", 400);
    }

    let profilePhotoUrl = "";
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const uploadResponse = await cloudinary.uploader.upload(
          fileUri.content,
          {
            folder: "user_profiles",
            transformation: { quality: "auto", fetch_format: "auto" },
          }
        );
        profilePhotoUrl = uploadResponse.secure_url;
      } catch (err) {
        console.error("Error uploading profile photo:", err);
        return sendErrorResponse(res, "Failed to upload profile photo.");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: profilePhotoUrl },
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
        profile: newUser.profile,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    return sendErrorResponse(res, "An error occurred. Please try again.");
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return sendErrorResponse(res, "All fields are required.", 400);
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendErrorResponse(res, "Invalid email or password.", 400);
    }

    if (user.role !== role) {
      return sendErrorResponse(
        res,
        "Role mismatch. Check your credentials.",
        400
      );
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Welcome back, ${user.fullname}`,
        user,
      });
  } catch (err) {
    console.error("Login error:", err);
    return sendErrorResponse(res, "An error occurred. Please try again.");
  }
};

// Logout a user
export const logout = (req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    success: true,
    message: "Logged out successfully.",
  });
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get the userId from the URL params
    const { fullname, email, phoneNumber, role, password } = req.body;

    // Check if the required fields are provided
    if (!fullname || !email || !phoneNumber || !role) {
      return sendErrorResponse(res, "All fields are required.", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, "User not found.", 404);
    }

    // Update the user data
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.role = role;

    // If the password is provided, hash it before updating
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // If the user provides a new profile photo, upload it
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const uploadResponse = await cloudinary.uploader.upload(
          fileUri.content,
          {
            folder: "user_profiles",
          }
        );
        user.profile.profilePhoto = uploadResponse.secure_url;
      } catch (err) {
        console.error("Error uploading profile photo:", err);
        return sendErrorResponse(res, "Failed to upload profile photo.");
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user,
    });
  } catch (err) {
    console.error("Update user error:", err);
    return sendErrorResponse(res, "Failed to update user.");
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id; // Ensure middleware sets this
    const user = await User.findById(userId);

    if (!user) {
      return sendErrorResponse(res, "User not found.", 404);
    }

    const { fullname, email, phoneNumber, bio, skills, ...rest } = req.body;

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const uploadResponse = await cloudinary.uploader.upload(
          fileUri.content,
          {
            folder: "user_profiles",
          }
        );
        user.profile.profilePhoto = uploadResponse.secure_url;
      } catch (err) {
        console.error("File upload error:", err);
        return sendErrorResponse(res, "Failed to upload profile photo.");
      }
    }

    Object.keys(rest).forEach((key) => {
      if (rest[key]) user.profile[key] = rest[key];
    });

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    return sendErrorResponse(res, "Failed to update profile.");
  }
};

// In your user.controller.js

// Controller to get user details by userId
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from URL params

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send user details as the response
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the user",
    });
  }
};

// Delete a user
// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by the given userId and delete it
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return sendErrorResponse(res, "User not found.", 404);
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    console.error("Delete user error:", err);
    return sendErrorResponse(res, "Failed to delete user.");
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    return sendErrorResponse(res, "Failed to fetch users.");
  }
};

// Create a new user (admin functionality)
export const createUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return sendErrorResponse(res, "All fields are required.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: newUser,
    });
  } catch (err) {
    console.error("Create user error:", err);
    return sendErrorResponse(
      res,
      err.data?.message ?? err.message ?? "Failed to create user."
    );
  }
};
