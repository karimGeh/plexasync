import { PayloadAction } from "@reduxjs/toolkit";
import VariablesClientAPI from "api/handlers/variables";
import { GetAllVariablesHandlerType } from "api/types/API/variables";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  VariablesAction,
  finish_get_all_variables,
} from "store/reducers/api/variables";

const all_variables = function* (
  action: PayloadAction<GetAllVariablesHandlerType["req"]>
) {
  const response = (yield call(
    VariablesClientAPI.getAllVariables,
    action.payload
  )) as Awaited<ReturnType<typeof VariablesClientAPI.getAllVariables>>;
  yield put(finish_get_all_variables(response));
};

function* saga() {
  yield takeEvery<VariablesAction["type"], typeof all_variables>(
    "variables/start_get_all_variables",
    all_variables
  );
}

export default saga;
