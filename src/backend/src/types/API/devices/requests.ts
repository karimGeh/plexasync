import { ConfigurationType, ProtocolParamsType, Protocols } from "../../Enums";
import { DeviceCommunicationSettingsType } from "../../models";

export interface CreateDeviceRequestType<T extends Protocols> {
  driver_id: string;
  name: string;
  ip_address: number[];
  port: number;
  protocol_params: ProtocolParamsType<T>;
  communication_settings: DeviceCommunicationSettingsType;
  configuration: ConfigurationType<T>;
}
