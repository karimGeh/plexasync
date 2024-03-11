import { HMI } from "../..";

export type CreateHMIRequestType = Omit<HMI, "id">;
export interface GetHMIByIdRequestType {}

export interface GetHMIsRequestType {
  page: string;
  limit: string;
  sort: string;
}

export interface AddVariablesToHMIRequestType {
  variables: string[];
}
