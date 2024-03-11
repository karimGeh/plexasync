import { Router } from "express";

// errors
import { NotFoundError } from "../errors/not-found-error";

// sub-routers
import { authRouter } from "./auth";
import { getDeviceById, getHMIById } from "../handlers/params";
import { DevicesHandlers } from "../handlers/devices";
import { HMIsHandlers } from "../handlers/hmis";
import { VariablesHandlers } from "../handlers/variables";

const router = Router();

router.param("hmi_id", getHMIById);
router.param("device_id", getDeviceById);

// routes
router.use("/auth", authRouter);

router.get("/devices", DevicesHandlers.getDevicesHandler);
router.get("/devices/:device_id", DevicesHandlers.getDeviceByIdHandler);
router.get(
  "/devices/:device_id/variables",
  DevicesHandlers.getVariablesByDeviceIdHandler
);
router.post("/devices", DevicesHandlers.createDeviceHandler);
router.post(
  "/devices/:device_id/variable",
  DevicesHandlers.createVariableHandler
);

router.get("/hmis", HMIsHandlers.getHMIsHandler);
router.get("/hmis/:hmi_id", HMIsHandlers.getHMIByIdHandler);
router.get("/hmis/:hmi_id/variables", HMIsHandlers.getVariablesByHMIId);
router.post("/hmis", HMIsHandlers.createHMIHandler);
router.post("/hmis/:hmi_id/variables", HMIsHandlers.addVariablesToHMI);
router.post(
  "/hmis/:hmi_id/variables/remove",
  HMIsHandlers.removeVariablesFromHMI
);

router.get("/variables", VariablesHandlers.getAllVariables);

// status
router.get("/status", async (_, res) => {
  return res.send("server up and running ✔✔");
});

router.all("*", async () => {
  throw new NotFoundError("route not found");
});

export { router as mainRouter };
