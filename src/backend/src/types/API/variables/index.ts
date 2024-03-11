import { CustomRequestHandler } from "..";
import { GetAllVariablesResponseType } from "./responses";

export type GetAllVariablesHandlerType = CustomRequestHandler<
  {},
  GetAllVariablesResponseType,
  {
    page: string;
    limit: string;
    sort: string;
  }
>;
