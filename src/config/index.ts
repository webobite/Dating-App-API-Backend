import * as dotenv from "dotenv";
import "reflect-metadata";

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  APP_NAME: process.env.APP_NAME,
  PORT: process.env.PORT,
};
