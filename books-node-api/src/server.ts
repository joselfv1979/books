import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import path from "path";
import { NODE_ENV, PORT } from "./config/config";
import { connect } from "./config/connect";
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

// Connection to database
connect();

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

const server = app.listen(PORT, () => {
  Logger.info(`NODE_ENV=${NODE_ENV}`);
  Logger.info(`Server is up and running @ http://localhost:${PORT}`);
});

export { app, server };

