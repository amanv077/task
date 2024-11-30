// routes/taskRoutes.js
import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

// Routes for tasks
router.post("/", isAdmin, createTask); // Create a new task
router.get("/", isAuthenticated, getTasks); // Get all tasks
router.get("/:id", isAuthenticated, getTaskById); // Get task by ID
router.put("/:id", isAuthenticated, updateTask); // Update task by ID
router.delete("/:id", isAdmin, deleteTask); // Delete task by ID

export default router;
