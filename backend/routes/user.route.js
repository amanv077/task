import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  deleteUser,
  getUserById,
  createUser,
  getAllUsers,
  updateUser, // Import the updateUser controller
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

/**
 * @route   POST /api/v1/user/register
 * @desc    Register a new user with profile picture upload
 * @access  Public
 */
router.post("/register", singleUpload, register);

/**
 * @route   POST /api/v1/user/login
 * @desc    Login an existing user
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   GET /api/v1/user/logout
 * @desc    Logout the currently logged-in user
 * @access  Public (but typically used after authentication)
 */
router.get("/logout", logout);

/**
 * @route   POST /api/v1/user/profile/update
 * @desc    Update the authenticated user's profile
 * @access  Private (Requires Authentication)
 */
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

/**
 * @route   PUT /api/v1/user/user/update/:userId
 * @desc    Update a user by ID (secured for authorized roles)
 * @access  Private (Requires Authentication, Role Validation Recommended)
 */
router.put("/user/update/:userId", isAdmin, singleUpload, updateUser); // Use PUT for update

/**
 * @route   DELETE /api/v1/user/user/delete/:userId
 * @desc    Delete a user by ID (secured for authorized roles)
 * @access  Private (Requires Authentication, Role Validation Recommended)
 */
router.delete("/user/delete/:userId", isAdmin, deleteUser);

/**
 * @route   POST /api/v1/user/user/create
 * @desc    Create a new user (Admin or special use cases)
 * @access  Private (Requires Authentication, Role Validation Recommended)
 */
router.post("/create", createUser);

router.get("/", getAllUsers); // Handle GET /api/v1/user
/**
 * @route   GET /api/v1/user/:userId
 * @desc    Get a user by ID
 * @access  Private (Requires Authentication)
 */
router.get("/:userId", getUserById);

// router.get("/user/:userId", isAdmin, async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId);

//     if (!user) {
//       return sendErrorResponse(res, "User not found.", 404);
//     }

//     return res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (err) {
//     console.error("Error fetching user:", err);
//     return sendErrorResponse(res, "Failed to fetch user.");
//   }
// });

export default router;
