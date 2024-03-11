import { Protocols, Variable } from "../..";

export interface CreateDeviceRequestType {
  name: string;
  description: string;
  ip_address: string;
  tags?: string[];
}

export interface GetDeviceByIdRequestType {}

export interface GetDevicesRequestType {
  page: string;
  limit: string;
  sort: string;
}

export type CreateVariableRequestType = Variable<Protocols>;

export interface GetVariablesByDeviceIdRequestType {}
