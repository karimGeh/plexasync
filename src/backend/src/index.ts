import dotenv from "dotenv";
import { environmentCheck } from "./utils/kick-off";
import db from "./db";
import app from "./app";

dotenv.config();

const start = async () => {
  environmentCheck();

  await db.connect();

  // if db not connected throw error
  if (!db.pool) {
    throw new Error("Database not connected");
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log(
      `server status : GET http://127.0.0.1:${process.env.PORT}/api/status`
    );
  });
};

start();
