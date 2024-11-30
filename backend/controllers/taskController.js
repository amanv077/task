// controllers/taskController.js
import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, assignees, deadline, priority } = req.body;
    const newTask = new Task({
      title,
      description,
      assignees,
      deadline,
      priority,
    });

    const savedTask = await newTask.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: savedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.isAdmin) {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ assignees: { $in: [req.user.fullname] } });
    }

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  let body = {};
  if (req.isAdmin) body = req.body;
  else body.status = req.body.status;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
