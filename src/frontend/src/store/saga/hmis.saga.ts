import { PayloadAction } from "@reduxjs/toolkit";
import HMIsClientAPI from "api/handlers/hmis";
import { GetHMIsHandlerType } from "api/types/API/hmi";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  HMIAction,
  finish_get_all_hmis,
  finish_get_hmi_by_id,
  finish_get_variables_by_hmi_id,
} from "store/reducers/api/hmis";

const all_hmis = function* (action: PayloadAction<GetHMIsHandlerType["req"]>) {
  const response = (yield call(
    HMIsClientAPI.getAllHMIs,
    action.payload
  )) as Awaited<ReturnType<typeof HMIsClientAPI.getAllHMIs>>;
  yield put(finish_get_all_hmis(response));
};

export const get_hmi_by_id = function* (
  action: PayloadAction<GetHMIsHandlerType["req"] & { hmi_id: string }>
) {
  const response = (yield call(
    HMIsClientAPI.getHMIById,
    action.payload
  )) as Awaited<ReturnType<typeof HMIsClientAPI.getHMIById>>;
  yield put(finish_get_hmi_by_id(response));
};

export const get_variables_by_hmi_id = function* (
  action: PayloadAction<GetHMIsHandlerType["req"] & { hmi_id: string }>
) {
  const response = (yield call(
    HMIsClientAPI.getVariablesByHMIId,
    action.payload
  )) as Awaited<ReturnType<typeof HMIsClientAPI.getVariablesByHMIId>>;
  yield put(finish_get_variables_by_hmi_id(response));
};

function* saga() {
  yield takeEvery<HMIAction["type"], typeof all_hmis>(
    "hmis/start_get_all_hmis",
    all_hmis
  );

  yield takeEvery<HMIAction["type"], typeof get_hmi_by_id>(
    "hmis/start_get_hmi_by_id",
    get_hmi_by_id
  );

  yield takeEvery<HMIAction["type"], typeof get_variables_by_hmi_id>(
    "hmis/start_get_variables_by_hmi_id",
    get_variables_by_hmi_id
  );
}

export default saga;
