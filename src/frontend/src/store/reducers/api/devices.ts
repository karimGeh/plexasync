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
  GetDevicesHandlerType,
  GetDeviceByIdHandlerType,
  GetVariablesByDeviceIdHandlerType,
} from "api/types/API/devices";

export type DevicesStateType = {
  all_devices: SagaRequestState<
    GetDevicesHandlerType["res"],
    GetDevicesHandlerType["req"]
  >;
  device_by_id: SagaRequestState<
    GetDeviceByIdHandlerType["res"],
    GetDeviceByIdHandlerType["req"]
  >;

  variables_by_device_id: SagaRequestState<
    GetVariablesByDeviceIdHandlerType["res"],
    GetVariablesByDeviceIdHandlerType["req"]
  >;
};

const initialState: DevicesStateType = {
  all_devices: defaultSagaRequestState,
  device_by_id: defaultSagaRequestState,
  variables_by_device_id: defaultSagaRequestState,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const action_set_request = action_start_builder<DevicesStateType>();
const action_set_request = action_set_request_builder<DevicesStateType>();
const action_start = action_start_builder<DevicesStateType>();
const action_finish = action_finish_builder<DevicesStateType>();
const action_reset = action_reset_builder<DevicesStateType>();

export const DevicesSlice = createSlice({
  name: APIMainRoutes.DEVICES,
  initialState,
  reducers: {
    set_request_get_all_devices: action_set_request("all_devices"),
    start_get_all_devices: action_start("all_devices"),
    finish_get_all_devices: action_finish("all_devices"),
    reset_get_all_devices: action_reset("all_devices"),

    // get device by id
    set_request_get_device_by_id: action_set_request("device_by_id"),
    start_get_device_by_id: action_start("device_by_id"),
    finish_get_device_by_id: action_finish("device_by_id"),
    reset_get_device_by_id: action_reset("device_by_id"),

    // get variables by device id
    set_request_get_variables_by_device_id: action_set_request(
      "variables_by_device_id"
    ),
    start_get_variables_by_device_id: action_start("variables_by_device_id"),
    finish_get_variables_by_device_id: action_finish("variables_by_device_id"),
    reset_get_variables_by_device_id: action_reset("variables_by_device_id"),
  },
});

const devicesReducer = DevicesSlice.reducer;

export const {
  set_request_get_all_devices,
  start_get_all_devices,
  finish_get_all_devices,
  reset_get_all_devices,
  set_request_get_device_by_id,
  start_get_device_by_id,
  finish_get_device_by_id,
  reset_get_device_by_id,
  set_request_get_variables_by_device_id,
  start_get_variables_by_device_id,
  finish_get_variables_by_device_id,
  reset_get_variables_by_device_id,
} = DevicesSlice.actions;

export type DevicesAction =
  | ReturnType<typeof set_request_get_all_devices>
  | ReturnType<typeof start_get_all_devices>
  | ReturnType<typeof finish_get_all_devices>
  | ReturnType<typeof reset_get_all_devices>
  | ReturnType<typeof set_request_get_device_by_id>
  | ReturnType<typeof start_get_device_by_id>
  | ReturnType<typeof finish_get_device_by_id>
  | ReturnType<typeof reset_get_device_by_id>
  | ReturnType<typeof set_request_get_variables_by_device_id>
  | ReturnType<typeof start_get_variables_by_device_id>
  | ReturnType<typeof finish_get_variables_by_device_id>
  | ReturnType<typeof reset_get_variables_by_device_id>;

export default devicesReducer;
