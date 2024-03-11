import { Device, Protocols, Variable } from "../..";

export interface CreateDeviceResponseType {
  success: boolean;
  device: Device;
}

export interface GetDeviceByIdResponseType {
  success: boolean;
  device: Device;
}

export interface GetDevicesResponseType {
  success: boolean;
  devices: Device[];
}

export interface CreateVariableResponseType {
  success: boolean;
  device: Device;
  variable: Variable<Protocols>;
}

export interface GetVariablesByDeviceIdResponseType {
  success: boolean;
  variables: Variable<Protocols>[];
}
