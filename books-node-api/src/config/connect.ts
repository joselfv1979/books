import mongoose from "mongoose";
import Logger from "../utils/logger";
import { DB_CONNECTION } from "./config";

// Ensure DB_CONNECTION is defined
if (!DB_CONNECTION) {
  Logger.error("❌ Missing DB_CONNECTION in environment variables (.env)");
  process.exit(1);
}

//connection mongodb atlas
export const connectDB = async (): Promise<mongoose.Connection> => {
  try {
    await mongoose.connect(DB_CONNECTION);
    Logger.info("✅ Database connected!");
    return mongoose.connection;
  } catch (error) {
    Logger.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

process.on("uncaughtException", (error) => {
  Logger.error("❌ Uncaught Exception:", error);
  mongoose.disconnect().finally(() => process.exit(1));
});

process.on("unhandledRejection", (reason) => {
  Logger.error("❌ Unhandled Promise Rejection:", reason);
  mongoose.disconnect().finally(() => process.exit(1));
});

export async function disconnect() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    Logger.error("DB disconnect error", error);
  }
}
