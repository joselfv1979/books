import mongoose from "mongoose";
import { DB_CONN_STRING } from "./config";
import Logger from "../utils/logger";

if (!DB_CONN_STRING) {
  console.error("Remember to have environment variables on a  file .env");
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
    await mongoose.connect(DB_CONN_STRING as string, options);
    Logger.info("Database connected!");
  } catch (error) {
    Logger.debug(error);
  }
};

process.on("uncaughtException", (error) => {
  Logger.debug(error);
  mongoose.disconnect();
});
