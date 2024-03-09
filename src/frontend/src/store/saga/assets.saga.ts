// import { PayloadAction } from "@reduxjs/toolkit";
// import AssetsClientAPI, {
//   GetAllAssetsRequest,
//   GetAssetByIdRequest,
// } from "api/assets";
// import { call, put, takeEvery } from "redux-saga/effects";
// import {
//   AssetsAction,
//   finish_all_assets,
//   finish_get_asset_by_id,
// } from "store/reducers/api/assets";

// const all_assets = function* (action: PayloadAction<GetAllAssetsRequest>) {
//   const response = (yield call(
//     AssetsClientAPI.getAllAssets,
//     action.payload
//   )) as Awaited<ReturnType<typeof AssetsClientAPI.getAllAssets>>;
//   yield put(finish_all_assets(response));
// };

// const start_get_asset_by_id = function* (
//   action: PayloadAction<GetAssetByIdRequest>
// ) {
//   const response = (yield call(
//     AssetsClientAPI.getAssetById,
//     action.payload
//   )) as Awaited<ReturnType<typeof AssetsClientAPI.getAssetById>>;
//   yield put(finish_get_asset_by_id(response));
// };

// function* saga() {
//   yield takeEvery<AssetsAction["type"], typeof all_assets>(
//     "assets/start_all_assets",
//     all_assets
//   );
//   yield takeEvery<AssetsAction["type"], typeof start_get_asset_by_id>(
//     "assets/start_get_asset_by_id",
//     start_get_asset_by_id
//   );
// }

// export default saga;
