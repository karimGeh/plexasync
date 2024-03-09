import { Reducer, combineReducers } from "redux";
import { ReduxReducers } from "store/types";

import globalReducer, { GlobalAction, GlobalState } from "./global";
import apiReducer, { APIAction, APIState } from "./api";

export type RootAction =
  //
  | GlobalAction
  //
  | APIAction;

const rootReducer = combineReducers<{
  [ReduxReducers.GLOBAL]: Reducer<GlobalState>;
  [ReduxReducers.API]: Reducer<APIState>;
}>({
  [ReduxReducers.GLOBAL]: globalReducer,
  [ReduxReducers.API]: apiReducer,
});

export default rootReducer;
