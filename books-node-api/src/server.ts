import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import path from "path";
import { NODE_ENV, PORT } from "./config/config";
import { connectDB } from "./config/connect";
import { errorHandler } from "./middlewares/errorHandler";
import morganMiddleware from "./middlewares/morganHandler";
import authRouter from "./routes/authRoutes";
import booksRouter from "./routes/bookRoutes";
import loansRouter from "./routes/loanRoutes";
import testRouter from "./routes/testRoutes";
import usersRouter from "./routes/userRoutes";
import Logger from "./utils/logger";

if (!PORT) {
  Logger.error("No port, process exit");
  process.exit(1);
}

const app = express();

// Middlewares
app.use(morganMiddleware);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "..", "/public")));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/loans", loansRouter);
app.use("/api/seed", testRouter);

// Error handler middleware
app.use(errorHandler);

// For testing purposes 
app.get("/", (_req, res) => {
  res.send("<h2>It's Working!</h2>");
});

// Error handler bad path
app.use((_req: Request, res: Response) => {
  res.status(404).json("Path not found");
});

// ------------------------
// Private server variable
// ------------------------
let server: ReturnType<typeof app.listen> | null = null;

// ------------------------
// Startup function
// ------------------------
const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start Express server
    server = app.listen(PORT, () => {
      Logger.info(`NODE_ENV=${NODE_ENV}`);
      Logger.info(`Server is up and running @ http://localhost:${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      Logger.info("🛑 Shutting down gracefully...");
      await mongoose.disconnect();
      server?.close(() => process.exit(0));
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    // Handle uncaught exceptions and unhandled rejections
    process.on("uncaughtException", async (error) => {
      Logger.error("❌ Uncaught Exception:", error);
      await shutdown();
    });

    process.on("unhandledRejection", async (reason) => {
      Logger.error("❌ Unhandled Promise Rejection:", reason);
      await shutdown();
    });

  } catch (error) {
    Logger.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// ------------------------
// Getter for tests
// ------------------------
const getServer = (): ReturnType<typeof app.listen> => {
  if (!server) {
    throw new Error("Server is not started yet. Call startServer() first.");
  }
  return server;
};

// ------------------------
// Auto-start the server if not in test environment
// ------------------------
if (process.env.NODE_ENV !== "test") {
  startServer();
}

// Export app and getServer for testing
export { app, getServer };






