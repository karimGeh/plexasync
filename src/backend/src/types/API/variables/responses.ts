import { Protocols, Variable } from "../..";

export interface GetAllVariablesResponseType {
  success: boolean;
  variables: Variable<Protocols>[];
}
