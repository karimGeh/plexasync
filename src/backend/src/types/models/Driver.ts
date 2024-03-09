import { ConfigurationType, ProtocolParamsType, Protocols } from "../Enums";

export interface DriverDeviceParamsType {
  id: string;
  reference: string;
  name: string;
  description: string;
  manufacturer: string;
  serial_number: string;
  firmware_version: string;
  device_capabilities: {
    readable: boolean;
    writable: boolean;
    controllable: boolean;
  };
}

export interface DeviceCommunicationSettingsType {
  baud_rate: number;
  data_bits: number;
  stop_bits: number;
  parity: "none" | "even" | "odd" | "mark" | "space";
}

export interface DriverType<T extends Protocols> {
  id: string;
  software_version: string;
  hardware_version: string;
  protocol: T;
  device_params: DriverDeviceParamsType;
  default__protocol_params: ProtocolParamsType<T>;
  default__communication_settings: DeviceCommunicationSettingsType;
  configuration: ConfigurationType<T>;
  tags: string[];
}
