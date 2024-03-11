import { PayloadAction } from "@reduxjs/toolkit";
import DevicesClientAPI from "api/handlers/devices";
import { GetDevicesHandlerType } from "api/types/API/devices";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  DevicesAction,
  finish_get_all_devices,
  finish_get_device_by_id,
  finish_get_variables_by_device_id,
} from "store/reducers/api/devices";

const all_devices = function* (
  action: PayloadAction<GetDevicesHandlerType["req"]>
) {
  const response = (yield call(
    DevicesClientAPI.getAllDevices,
    action.payload
  )) as Awaited<ReturnType<typeof DevicesClientAPI.getAllDevices>>;
  yield put(finish_get_all_devices(response));
};

export const get_device_by_id = function* (
  action: PayloadAction<GetDevicesHandlerType["req"] & { device_id: string }>
) {
  const response = (yield call(
    DevicesClientAPI.getDeviceById,
    action.payload
  )) as Awaited<ReturnType<typeof DevicesClientAPI.getDeviceById>>;
  yield put(finish_get_device_by_id(response));
};

export const get_variables_by_device_id = function* (
  action: PayloadAction<GetDevicesHandlerType["req"] & { device_id: string }>
) {
  const response = (yield call(
    DevicesClientAPI.getVariablesByDeviceId,
    action.payload
  )) as Awaited<ReturnType<typeof DevicesClientAPI.getVariablesByDeviceId>>;
  yield put(finish_get_variables_by_device_id(response));
};

function* saga() {
  yield takeEvery<DevicesAction["type"], typeof all_devices>(
    "devices/start_get_all_devices",
    all_devices
  );

  yield takeEvery<DevicesAction["type"], typeof get_device_by_id>(
    "devices/start_get_device_by_id",
    get_device_by_id
  );

  yield takeEvery<DevicesAction["type"], typeof get_variables_by_device_id>(
    "devices/start_get_variables_by_device_id",
    get_variables_by_device_id
  );
}

export default saga;
