import dotenv from "dotenv";

const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `./../../.env`),
});

const {
  DEV_HOST,
  DEV_PORT,
  DEV_DATABASE,
  PROD_PORT,
  PROD_HOST,
  PROD_DATABASE,
  TEST_HOST,
  TEST_PORT,
  TEST_DATABASE,
  NODE_ENV
} = process.env;

let db = '';
let host = '';
let port = '';

if (NODE_ENV === "development") {
  db = DEV_DATABASE as string;
  host = DEV_HOST as string;
  port = DEV_PORT as string
} else if (NODE_ENV === "test") {
  db = TEST_DATABASE as string;
  host = TEST_HOST as string;
  port = TEST_PORT as string;
} else {
  db = PROD_DATABASE as string;
  host = PROD_HOST as string;
  port = PROD_PORT as string;
}

const DB_CONNECTION = db;
const HOST = host;
const PORT = port;

export { DB_CONNECTION, HOST, NODE_ENV, PORT };

