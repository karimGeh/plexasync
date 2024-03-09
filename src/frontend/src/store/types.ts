import { APIState } from "./reducers/api";
import { GlobalState } from "./reducers/global";

export enum ReduxReducers {
  GLOBAL = "global",
  API = "api",
}

export interface RootStateType {
  [ReduxReducers.GLOBAL]: GlobalState;
  [ReduxReducers.API]: APIState;
}
