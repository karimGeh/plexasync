import { all, fork } from "redux-saga/effects";
import devices_saga from "./devices.saga";
import hmis_saga from "./hmis.saga";

function* RootSaga() {
  yield all([fork(devices_saga)]);
  yield all([fork(hmis_saga)]);
}

export default RootSaga;
