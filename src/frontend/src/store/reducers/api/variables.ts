import { createSlice } from "@reduxjs/toolkit";
import { APIMainRoutes } from "api/types";
import {
  SagaRequestState,
  action_finish_builder,
  action_reset_builder,
  action_start_builder,
  action_set_request_builder,
  defaultSagaRequestState,
} from "./types";
import { GetAllVariablesHandlerType } from "api/types/API/variables";

export type VariablesStateType = {
  all_variables: SagaRequestState<
    GetAllVariablesHandlerType["res"],
    GetAllVariablesHandlerType["req"]
  >;
};

const initialState: VariablesStateType = {
  all_variables: defaultSagaRequestState,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const action_set_request = action_start_builder<VariablesStateType>();
const action_set_request = action_set_request_builder<VariablesStateType>();
const action_start = action_start_builder<VariablesStateType>();
const action_finish = action_finish_builder<VariablesStateType>();
const action_reset = action_reset_builder<VariablesStateType>();

export const VariablesSlice = createSlice({
  name: APIMainRoutes.VARIABLES,
  initialState,
  reducers: {
    set_request_get_all_variables: action_set_request("all_variables"),
    start_get_all_variables: action_start("all_variables"),
    finish_get_all_variables: action_finish("all_variables"),
    reset_get_all_variables: action_reset("all_variables"),
  },
});

const variablesReducer = VariablesSlice.reducer;

export const {
  set_request_get_all_variables,
  start_get_all_variables,
  finish_get_all_variables,
  reset_get_all_variables,
} = VariablesSlice.actions;

export type VariablesAction = ReturnType<
  (typeof VariablesSlice.actions)[keyof typeof VariablesSlice.actions]
>;

export default variablesReducer;
