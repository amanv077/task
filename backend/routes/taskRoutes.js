// routes/taskRoutes.js
import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Routes for tasks
router.post("/", createTask); // Create a new task
router.get("/", getTasks); // Get all tasks
router.get("/:id", getTaskById); // Get task by ID
router.put("/:id", updateTask); // Update task by ID
router.delete("/:id", deleteTask); // Delete task by ID

export default router;
