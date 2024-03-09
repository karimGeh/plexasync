import { DeviceModel } from "../../models/Device";
import {
  CreateDeviceHandlerType,
  GetDevicesHandlerType,
} from "../../types/API/devices";

const createDeviceHandler: CreateDeviceHandlerType = async (req, res) => {
  const {
    name, //
    driver_id,
    ip_address,
    port,
    tags,
  } = req.body;

  const driver = req.driver;

  const device = await DeviceModel.createDevice({
    name,
    driver_id,
    ip_address,
    port,
    configuration: driver.configuration,
    protocol_params: driver.default__protocol_params,
    communication_settings: driver.default__communication_settings,
    params: driver.device_params,
    protocol: driver.protocol,
    tags,
  });

  res.status(201).json({
    success: true,
    device,
  });
};

// get devices handler
const getDevicesHandler: GetDevicesHandlerType = async (req, res) => {
  const { page, limit, sort } = req.query;

  const devices = await DeviceModel.getDevices({
    page: page ? parseInt(page as string) : undefined,
    limit: limit ? parseInt(limit as string) : undefined,
    sort: sort ? (sort as string) : undefined,
  });

  res.status(200).json({
    success: true,
    devices,
  });
};

export const DevicesHandlers = {
  createDeviceHandler,
  getDevicesHandler,
};
