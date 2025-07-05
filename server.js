import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();
import  PostsRoute  from "./src/routes/posts.js";
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: " API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API routes
app.use("/api/posts", PostsRoute);
// app.use("/api/admin", adminRoutes);
// app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("App is Running");
});
// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error:", error);

  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
      API Server is running!
 Port: ${PORT}
 Environment: ${process.env.NODE_ENV}
 Database: ${process.env.DATABASE_URL ? "Connected" : "Not configured"}
 AWS S3: ${process.env.AWS_S3_BUCKET_NAME ? "Configured" : "Not configured"}
  `);
});

export default app;
