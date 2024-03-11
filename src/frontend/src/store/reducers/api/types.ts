import { APIResponse, CustomError } from "api/types";
import { PayloadAction } from "@reduxjs/toolkit";

// make SagaRequestState the union of APIResponse and the loading/error object
// eslint-disable-next-line
export interface SagaRequestState<TResponse = any, TRequest = any> {
  request: (TRequest & { requested_at: number }) | null;
  response: TResponse | null;
  errors: CustomError[] | null;
  loading: boolean;
  isError: boolean;
}

export const defaultSagaRequestState = {
  request: null,
  response: null,
  errors: null,
  loading: false,
  isError: false,
};

export interface SagaActionRequest<TRequest> {
  type: string;
  payload: TRequest;
}

export interface SagaAction<TResponse> {
  type: string;
  payload: APIResponse<TResponse>;
}

export const action_set_request_builder =
  <StateType extends { [x: string]: SagaRequestState }>() =>
  <
    K extends keyof StateType,
    T extends Omit<StateType[K]["request"], "requested_at">
  >(
    name: K
  ) =>
  (state: StateType, _: PayloadAction<T>) => {
    state[name].request = _.payload;
  };

export const action_start_builder =
  <StateType extends { [x: string]: SagaRequestState }>() =>
  <K extends keyof StateType>(name: K) =>
  // eslint-disable-next-line
  (
    state: StateType,
    _: PayloadAction<Omit<StateType[K]["request"], "requested_at">>
  ) => {
    state[name].request = { ..._.payload, requested_at: new Date().getTime() };
    state[name].loading = true;
    state[name].isError = false;
  };

export const action_finish_builder =
  <StateType extends { [x: string]: SagaRequestState }>() =>
  <K extends keyof StateType, T extends StateType[K]["response"]>(
    name: K,
    callback?: (state: StateType) => void
  ) =>
  (state: StateType, action: SagaAction<T>) => {
    state[name].loading = false;
    state[name].response = action.payload.response;
    state[name].errors = action.payload.errors;
    state[name].isError = !action.payload.response;
    if (callback) callback(state);
  };

export const action_reset_builder =
  <StateType extends { [x: string]: SagaRequestState }>() =>
  <K extends keyof StateType>(name: K) =>
  (state: StateType) => {
    state[name] = defaultSagaRequestState as StateType[K];
  };
