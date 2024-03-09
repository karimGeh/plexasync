import { CustomRequestHandler } from "..";
import { CreateDeviceRequestType } from "./requests";
import { CreateDeviceResponseType, GetDevicesResponseType } from "./responses";

export type CreateDeviceHandlerType = CustomRequestHandler<
  CreateDeviceRequestType,
  CreateDeviceResponseType
>;

export type GetDevicesHandlerType = CustomRequestHandler<
  {},
  GetDevicesResponseType,
  {
    page: string;
    limit: string;
    sort: string;
  }
>;
