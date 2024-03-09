import { Middleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "store/reducers";

// middlewareList
// import logger from "redux-logger";

import { ReduxReducers, RootStateType } from "store/types";
import RootSaga from "./saga";
// import RootSaga from "./saga";

// logger middleware declaration for development
declare global {
  interface Window {
    // eslint-disable-next-line
    __REDUX_DEVTOOLS_EXTENSION__: (...a: any) => any | undefined;
  }
}

// saga middleware declaration
const saga = createSagaMiddleware();

const middlewareList: Middleware[] = [
  saga,
  // logger,
];

const persistConfig: PersistConfig<RootStateType> = {
  key: "root",
  storage: storage,
  whitelist: [ReduxReducers.GLOBAL],
  timeout: 10_000, // 10 seconds
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(middlewareList),
});

export const persistor = persistStore(store);

saga.run(RootSaga);
