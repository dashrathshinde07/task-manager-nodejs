const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksById,
} = require("../controllers/taskControllers");

const router = express.Router();

router.get("/", getTasks); // Fetch all tasks
router.get("/:id", getTasksById); // Fetch a task by ID
router.post("/", createTask); // Create a new task
router.put("/:id", updateTask); // Update a task
router.delete("/:id", deleteTask); // Delete a task

module.exports = router;
