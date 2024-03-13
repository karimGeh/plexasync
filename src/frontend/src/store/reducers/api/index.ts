import { APIMainRoutes } from "api/types";
import { combineReducers } from "redux";
import devicesReducer, { DevicesAction } from "./devices";
import hmisReducer, { HMIAction } from "./hmis";
import variablesReducer, { VariablesAction } from "./variables";

export type APIState = {
  [APIMainRoutes.DEVICES]: ReturnType<typeof devicesReducer>;
  [APIMainRoutes.HMIS]: ReturnType<typeof hmisReducer>;
  [APIMainRoutes.VARIABLES]: ReturnType<typeof variablesReducer>;
};

// eslint-disable-next-line
export type APIAction = DevicesAction | HMIAction | VariablesAction;

const reducer = combineReducers({
  [APIMainRoutes.DEVICES]: devicesReducer,
  [APIMainRoutes.HMIS]: hmisReducer,
  [APIMainRoutes.VARIABLES]: variablesReducer,
});

export default reducer;
