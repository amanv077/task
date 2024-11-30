import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import taskRoutes from "./routes/taskRoutes.js";

// ES module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request Logging (for debugging)
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// CORS Configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL.split(",")
      : ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

// Environment and Port
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from React build folder
app.use(express.static(path.join(__dirname, "./dist")));

// Root Route (for quick API health check)
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Task ManagerAPI!",
    success: true,
  });
});

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tasks", taskRoutes);

// Catch-all route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// Catch-All Route for Undefined Routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Generic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    success: false,
  });
});

// Start Server and Connect to Database
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
});
