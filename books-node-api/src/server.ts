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
import morgan from "morgan";

if (!PORT) {
  process.exit(1);
}

const app = express();

// Middlewares
app.use(morgan("dev"));
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

connect();

console.log(`NODE_ENV=${NODE_ENV}`);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
