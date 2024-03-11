import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import path from "path";

//? middleware
import { errorHandler } from "./middlewares/error-handler";

import { RequiredEnvVarsKeys } from "./utils/kick-off";
import { mainRouter } from "./routes";
import { HMI, Device } from "./types";

//? global declaration
declare global {
  namespace NodeJS {
    interface ProcessEnv extends Record<RequiredEnvVarsKeys, string> {}
  }

  namespace Express {
    interface Request {
      auth_user: any;
      device: Device;
      hmi: HMI;
    }
  }
}

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));

app.use(express.json());

//!
//! routes - start
app.use("/api", mainRouter);
app.use("/", express.static(path.join(__dirname, "..", "client")));
//! routes - end
//!

app.all("*", async (_, res) => {
  return res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.use(errorHandler);

export default app;
