const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"], // Title is mandatory
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed"], // Restrict to these values
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
