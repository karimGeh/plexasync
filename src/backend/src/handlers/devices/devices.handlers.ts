import { DeviceModel } from "../../models/Device";
import { VariableModel } from "../../models/Variable";
import {
  CreateDeviceHandlerType,
  CreateVariableHandlerType,
  GetDeviceByIdHandlerType,
  GetDevicesHandlerType,
  GetVariablesByDeviceIdHandlerType,
} from "../../types/API/devices";

const createDeviceHandler: CreateDeviceHandlerType = async (req, res) => {
  const {
    name, //
    description,
    ip_address,
    tags,
  } = req.body;

  const device = await DeviceModel.createDevice({
    name,
    description,
    ip_address,
    tags,
  });

  res.status(201).json({
    success: true,
    device,
  });
};

const getDeviceByIdHandler: GetDeviceByIdHandlerType = async (req, res) => {
  const device = req.device;

  res.status(200).json({
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

const createVariableHandler: CreateVariableHandlerType = async (req, res) => {
  const {
    name,
    description,
    protocol,
    protocol_params,
    port,
    offset_factor,
    scale_factor,
    unit,
    tags,
  } = req.body;

  const device = req.device;

  const variable = await VariableModel.createVariable({
    name,
    description,
    protocol,
    protocol_params,
    port,
    offset_factor,
    scale_factor,
    unit,
    tags,
    device_id: device.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  res.status(201).json({
    success: true,
    variable,
    device,
  });
};

const getVariablesByDeviceIdHandler: GetVariablesByDeviceIdHandlerType = async (
  req,
  res
) => {
  const device = req.device;

  const variables = await VariableModel.getVariablesByDeviceId(device.id);

  res.status(200).json({
    success: true,
    variables,
  });
};

export const DevicesHandlers = {
  createDeviceHandler,
  getDeviceByIdHandler,
  getDevicesHandler,
  createVariableHandler,
  getVariablesByDeviceIdHandler,
};
