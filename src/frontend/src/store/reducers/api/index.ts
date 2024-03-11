import { APIMainRoutes } from "api/types";
import { combineReducers } from "redux";
import devicesReducer, { DevicesAction } from "./devices";
import hmisReducer, { HMIAction } from "./hmis";

export type APIState = {
  [APIMainRoutes.DEVICES]: ReturnType<typeof devicesReducer>;
  [APIMainRoutes.HMIS]: ReturnType<typeof hmisReducer>;
  placeholder: string;
};

// eslint-disable-next-line
export type APIAction = DevicesAction | HMIAction;

const reducer = combineReducers({
  [APIMainRoutes.DEVICES]: devicesReducer,
  [APIMainRoutes.HMIS]: hmisReducer,
});

export default reducer;
