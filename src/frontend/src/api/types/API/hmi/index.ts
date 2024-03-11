import { CustomRequestHandler } from "..";
import {
  AddVariablesToHMIRequestType,
  CreateHMIRequestType,
  GetHMIByIdRequestType,
} from "./requests";
import {
  AddVariablesToHMIResponseType,
  CreateHMIResponseType,
  GetHMIByIdResponseType,
  GetHMIsResponseType,
  GetVariablesByHMIIdResponseType,
} from "./responses";

export type CreateHMIHandlerType = CustomRequestHandler<
  CreateHMIRequestType,
  CreateHMIResponseType
>;

export type GetHMIByIdHandlerType = CustomRequestHandler<
  GetHMIByIdRequestType,
  GetHMIByIdResponseType
>;

export type GetHMIsHandlerType = CustomRequestHandler<
  // eslint-disable-next-line
  {},
  GetHMIsResponseType,
  {
    page: string;
    limit: string;
    sort: string;
  }
>;

export type AddVariablesToHMIHandlerType = CustomRequestHandler<
  AddVariablesToHMIRequestType,
  AddVariablesToHMIResponseType
>;

export type GetVariablesByHMIIdHandlerType = CustomRequestHandler<
  // eslint-disable-next-line
  {},
  GetVariablesByHMIIdResponseType
>;
