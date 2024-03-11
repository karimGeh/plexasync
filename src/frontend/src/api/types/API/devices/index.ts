import { CustomRequestHandler } from "..";
import {
  CreateDeviceRequestType,
  CreateVariableRequestType,
  GetDeviceByIdRequestType,
  GetVariablesByDeviceIdRequestType,
} from "./requests";
import {
  CreateDeviceResponseType,
  CreateVariableResponseType,
  GetDeviceByIdResponseType,
  GetDevicesResponseType,
  GetVariablesByDeviceIdResponseType,
} from "./responses";

export type CreateDeviceHandlerType = CustomRequestHandler<
  CreateDeviceRequestType,
  CreateDeviceResponseType
>;

export type GetDeviceByIdHandlerType = CustomRequestHandler<
  GetDeviceByIdRequestType,
  GetDeviceByIdResponseType
>;

export type GetDevicesHandlerType = CustomRequestHandler<
  // eslint-disable-next-line
  {},
  GetDevicesResponseType,
  {
    page: string;
    limit: string;
    sort: string;
  }
>;

export type CreateVariableHandlerType = CustomRequestHandler<
  CreateVariableRequestType,
  CreateVariableResponseType
>;

export type GetVariablesByDeviceIdHandlerType = CustomRequestHandler<
  GetVariablesByDeviceIdRequestType,
  GetVariablesByDeviceIdResponseType
>;
