import { RequestParamHandler } from "express";
import { DeviceModel } from "../../models/Device";
import { NotFoundError } from "../../errors/not-found-error";
import { HMIModel } from "../../models/HMI";

export const getDeviceById: RequestParamHandler = async (req, _, next, id) => {
  const device = await DeviceModel.getDeviceById(id);

  if (!device) {
    throw new NotFoundError("Device not found");
  }

  req.device = device;
  next();
};

export const getHMIById: RequestParamHandler = async (req, _, next, id) => {
  const hmi = await HMIModel.getHMIById(id);

  if (!hmi) {
    throw new NotFoundError("HMI not found");
  }

  req.hmi = hmi;
  next();
};
