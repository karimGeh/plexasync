import { Router } from "express";

// errors
import { NotFoundError } from "../errors/not-found-error";

// sub-routers
import { authRouter } from "./auth";

const router = Router();

// routes
router.use("/auth", authRouter);

// status
router.get("/status", async (_, res) => {
  return res.send("server up and running ✔✔");
});

router.all("*", async () => {
  throw new NotFoundError("route not found");
});

export { router as mainRouter };
