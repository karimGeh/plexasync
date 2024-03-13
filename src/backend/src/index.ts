import dotenv from "dotenv";
import { environmentCheck } from "./utils/kick-off";
import db from "./db";
import app from "./app";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import http from "http";
import { hmiRoomsController } from "./hmi_rooms";

const server = http.createServer(app);

const ioServer = new Server(server, {
  cors: {
    origin: ["*", "https://admin.socket.io"],
  },
});

instrument(ioServer, { auth: false });

dotenv.config();

const start = async () => {
  environmentCheck();

  await db.connect();

  // if db not connected throw error
  if (!db.pool) {
    throw new Error("Database not connected");
  }

  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log(
      `server status : GET http://127.0.0.1:${process.env.PORT}/api/status`
    );
  });

  hmiRoomsController.setIoServer(ioServer);
  // socket connection on /hmi/:id
  ioServer.on("connection", async (socket) => {
    socket.on("join", (hmi_id: string) => {
      console.log("join", hmi_id);
      socket.join(hmi_id);
      hmiRoomsController.addHMI(hmi_id);
    });
    // socket.join(hmi_id);
    // socket.to(hmi_id).emit("variable_value", {
    //   variable_id: "test",
    //   value: "test",
    // });
    // await hmiRoomsController.addHMI(hmi_id);

    // socket.on("disconnect", async () => {
    //   await hmiRoomsController.removeHMI(hmi_id);
    // });
  });
};

start();
