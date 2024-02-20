import { CustomRequestHandler } from "..";
import { Protocols } from "../../Enums";
import { CreateDeviceRequestType } from "./requests";
import { CreateDeviceResponseType } from "./responses";

export type CreateDeviceHandlerType = CustomRequestHandler<
  CreateDeviceRequestType<Protocols>,
  CreateDeviceResponseType
>;
