import { Protocols } from "../../Enums";
import { DeviceType } from "../../models";

export interface CreateDeviceResponseType {
  success: boolean;
  device: DeviceType<Protocols>;
}

export interface GetDevicesResponseType {
  success: boolean;
  devices: DeviceType<Protocols>[];
}
