import dotenv from "dotenv";
import path from "path";

const { NODE_ENV } = process.env;

dotenv.config({
  path: path.resolve(__dirname, `./../../env/.env.${NODE_ENV}`),
});

const {
  HOST,
  PORT,
  DB_HEADER,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DATABASE,
  DB_OPTIONS,
} = process.env;

const DB_CONNECTION = `${DB_HEADER}//${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DATABASE}?${DB_OPTIONS}`

export { DB_CONNECTION, HOST, NODE_ENV, PORT };

