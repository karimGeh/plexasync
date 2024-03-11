import { HMI, Protocols, Variable } from "../..";

export interface CreateHMIResponseType {
  success: boolean;
  hmi: HMI;
}

export interface GetHMIByIdResponseType {
  success: boolean;
  hmi: HMI;
}

export interface GetHMIsResponseType {
  success: boolean;
  hmis: HMI[];
}

export interface AddVariablesToHMIResponseType {
  success: boolean;
  hmi: HMI;
}

export interface GetVariablesByHMIIdResponseType {
  success: boolean;
  hmi: HMI;
  variables: Variable<Protocols>[];
}
