import { PORT, NODE_ENV } from "./config/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connect } from "./config/connect";
import authRouter from "./routes/authRoutes";
import usersRouter from "./routes/userRoutes";
import booksRouter from "./routes/bookRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import path from "path";
import morganMiddleware from "./middlewares/morganHandler";
import Logger from "./utils/logger";
import { createBooks } from "./utils/createBooks";

if (!PORT) {
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

// Error handler middleware
app.use(errorHandler);

// For testing purposes 
app.get("/", (_req, res) => {
  res.send("<h2>It's Working!</h2>");
});

export const startServer = async () => {

  await connect();

  // Uncomment to populate database
  // createBooks();

  app.listen(PORT, () => {
    Logger.info(`NODE_ENV=${NODE_ENV}`);
    Logger.info(`Server is up and running @ http://localhost:${PORT}`);
  });
}

startServer();
