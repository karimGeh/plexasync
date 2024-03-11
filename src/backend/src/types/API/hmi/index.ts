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
  {},
  GetVariablesByHMIIdResponseType
>;
