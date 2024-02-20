import { ConfigurationType, ProtocolParamsType, Protocols } from "../Enums";
import {
  DeviceCommunicationSettingsType,
  DriverDeviceParamsType,
} from "./Driver";

export interface DeviceType<T extends Protocols> {
  id: string;
  name: string;
  driver_id: string;
  cover_uri: string;
  ip_address: number[];
  port: number;

  protocol: T;
  protocol_params: ProtocolParamsType<T>;

  params: DriverDeviceParamsType;
  communication_settings: DeviceCommunicationSettingsType;

  configuration: ConfigurationType<T>;

  tags: string[];
}
