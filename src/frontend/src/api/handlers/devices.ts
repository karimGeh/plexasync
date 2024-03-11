import api from "api";
import { ApiGenerator } from "api/apiGenerator";
import {
  GetDevicesHandlerType,
  CreateDeviceHandlerType,
  CreateVariableHandlerType,
  GetDeviceByIdHandlerType,
  GetVariablesByDeviceIdHandlerType,
} from "api/types/API/devices";

// eslint-disable-next-line
const getAllDevices = ApiGenerator<
  GetDevicesHandlerType["req"],
  GetDevicesHandlerType["res"]
>(() => api.get("/devices/"));

const getDeviceById = ApiGenerator<
  GetDeviceByIdHandlerType["req"] & { device_id: string },
  GetDeviceByIdHandlerType["res"]
>(({ device_id }) => api.get(`/devices/${device_id}`));

const createDevice = ApiGenerator<
  CreateDeviceHandlerType["req"],
  CreateDeviceHandlerType["res"]
>((data) => api.post("/devices/", data));

const createVariable = ApiGenerator<
  CreateVariableHandlerType["req"],
  CreateVariableHandlerType["res"]
>((data) => api.post(`/devices/${data.device_id}/variable`, data));

const getVariablesByDeviceId = ApiGenerator<
  GetVariablesByDeviceIdHandlerType["req"] & { device_id: string },
  GetVariablesByDeviceIdHandlerType["res"]
>((data) => api.get(`/devices/${data.device_id}/variables`));

const DevicesClientAPI = {
  getAllDevices,
  getDeviceById,
  getVariablesByDeviceId,
  createDevice,
  createVariable,
};

export default DevicesClientAPI;
