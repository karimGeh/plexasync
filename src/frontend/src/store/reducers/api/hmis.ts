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
import {
  GetHMIsHandlerType,
  GetHMIByIdHandlerType,
  GetVariablesByHMIIdHandlerType,
} from "api/types/API/hmi";

export type HMIStateType = {
  get_all_hmis: SagaRequestState<
    GetHMIsHandlerType["res"],
    GetHMIsHandlerType["req"]
  >;
  get_hmi_by_id: SagaRequestState<
    GetHMIByIdHandlerType["res"],
    GetHMIByIdHandlerType["req"]
  >;
  get_variables_by_hmi_id: SagaRequestState<
    GetVariablesByHMIIdHandlerType["res"],
    GetVariablesByHMIIdHandlerType["req"]
  >;
};

const initialState: HMIStateType = {
  get_all_hmis: defaultSagaRequestState,
  get_hmi_by_id: defaultSagaRequestState,
  get_variables_by_hmi_id: defaultSagaRequestState,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const action_set_request = action_start_builder<HMIStateType>();
const action_set_request = action_set_request_builder<HMIStateType>();
const action_start = action_start_builder<HMIStateType>();
const action_finish = action_finish_builder<HMIStateType>();
const action_reset = action_reset_builder<HMIStateType>();

export const HMISlice = createSlice({
  name: APIMainRoutes.HMIS,
  initialState,
  reducers: {
    set_request_get_all_hmis: action_set_request("get_all_hmis"),
    start_get_all_hmis: action_start("get_all_hmis"),
    finish_get_all_hmis: action_finish("get_all_hmis"),
    reset_get_all_hmis: action_reset("get_all_hmis"),

    // get hmi by id
    set_request_get_hmi_by_id: action_set_request("get_hmi_by_id"),
    start_get_hmi_by_id: action_start("get_hmi_by_id"),
    finish_get_hmi_by_id: action_finish("get_hmi_by_id"),
    reset_get_hmi_by_id: action_reset("get_hmi_by_id"),

    // get variables by hmi id
    set_request_get_variables_by_hmi_id: action_set_request(
      "get_variables_by_hmi_id"
    ),
    start_get_variables_by_hmi_id: action_start("get_variables_by_hmi_id"),
    finish_get_variables_by_hmi_id: action_finish("get_variables_by_hmi_id"),
    reset_get_variables_by_hmi_id: action_reset("get_variables_by_hmi_id"),
  },
});

const hmisReducer = HMISlice.reducer;

export const {
  set_request_get_all_hmis,
  start_get_all_hmis,
  finish_get_all_hmis,
  reset_get_all_hmis,
  set_request_get_hmi_by_id,
  start_get_hmi_by_id,
  finish_get_hmi_by_id,
  reset_get_hmi_by_id,
  set_request_get_variables_by_hmi_id,
  start_get_variables_by_hmi_id,
  finish_get_variables_by_hmi_id,
  reset_get_variables_by_hmi_id,
} = HMISlice.actions;

export type HMIAction =
  | ReturnType<typeof set_request_get_all_hmis>
  | ReturnType<typeof start_get_all_hmis>
  | ReturnType<typeof finish_get_all_hmis>
  | ReturnType<typeof reset_get_all_hmis>
  | ReturnType<typeof set_request_get_hmi_by_id>
  | ReturnType<typeof start_get_hmi_by_id>
  | ReturnType<typeof finish_get_hmi_by_id>
  | ReturnType<typeof reset_get_hmi_by_id>
  | ReturnType<typeof set_request_get_variables_by_hmi_id>
  | ReturnType<typeof start_get_variables_by_hmi_id>
  | ReturnType<typeof finish_get_variables_by_hmi_id>
  | ReturnType<typeof reset_get_variables_by_hmi_id>;

export default hmisReducer;
