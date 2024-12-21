const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
connectDB();

const app = express();

// Debugging: Log environment and server initialization
console.log("Environment Variables Loaded:", process.env);
console.log("Starting Server...");

// Middleware
app.use(express.json());
console.log("JSON Middleware Initialized");

// CORS Middleware
app.use(cors());
console.log("CORS Middleware Initialized");

// Routes
app.use("/auth", authRoutes);
console.log("Auth Routes Registered");
app.use("/tasks", taskRoutes);
console.log("Task Routes Registered");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
