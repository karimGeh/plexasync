import { CustomRequestHandler } from "..";
import { GetAllVariablesResponseType } from "./responses";

export type GetAllVariablesHandlerType = CustomRequestHandler<
  // eslint-disable-next-line
  {},
  GetAllVariablesResponseType,
  {
    page: string;
    limit: string;
    sort: string;
  }
>;
