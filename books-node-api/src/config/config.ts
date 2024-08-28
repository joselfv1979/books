import dotenv from "dotenv";

const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `./../../.env`),
});

const {
  PROD_PORT,
  PROD_HOST,
  DEV_HOST,
  DEV_PORT,
  DEV_DATABASE,
  PROD_DATABASE,
  TEST_DATABASE,
  NODE_ENV
} = process.env;

const HOST = NODE_ENV === "development" ? DEV_HOST : PROD_HOST;
const PORT = NODE_ENV === "development" ? DEV_PORT : PROD_PORT;

let db = '';

if (NODE_ENV === "development") {
  db = DEV_DATABASE as string;
} else if (NODE_ENV === "test") {
  db = TEST_DATABASE as string;
} else {
  db = PROD_DATABASE as string;
}

const DB_CONNECTION = db;

export { DB_CONNECTION, HOST, NODE_ENV, PORT };

