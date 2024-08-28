import mongoose from "mongoose";
import Logger from "../utils/logger";
import { DB_CONNECTION } from "./config";

if (!DB_CONNECTION) {
  Logger.error("Remember to have environment variables on a file .env");
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

//connection mongodb atlas
export const connect = async () => {
  try {
    await mongoose.connect(DB_CONNECTION, options);
    Logger.info("Database connected!");
  } catch (error) {
    Logger.debug(error);
    process.exit(1);
  }
};

process.on("uncaughtException", (error) => {
  Logger.debug(error);
  mongoose.disconnect();
});

export async function disconnect() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    Logger.info("DB disconnect error");
  }
}
