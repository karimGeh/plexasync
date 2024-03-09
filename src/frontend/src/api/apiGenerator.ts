import { APIResponse, CustomError } from "./types";
import { AxiosError, AxiosResponse } from "axios";
import { errorParser } from "./errorHandler";

export type ApiGeneratorOptionsType = {
  responseType?:
    | "json"
    | "text"
    | "arraybuffer"
    | "blob"
    | "document"
    | "stream";
};

const defaultOptions: ApiGeneratorOptionsType = {
  responseType: "json",
};

type ApiGeneratorType = <TRequest, TResponse>(
  callback: (props: TRequest) => Promise<AxiosResponse<TResponse>>
  //   options?: ApiGeneratorOptionsType
) => (props: TRequest) => Promise<APIResponse<TResponse, CustomError>>;

export const ApiGenerator: ApiGeneratorType =
  <TRequest, TResponse>(
    callback: (props: TRequest) => Promise<AxiosResponse<TResponse>>,
    options: ApiGeneratorOptionsType = defaultOptions
  ) =>
  async (props: TRequest) => {
    try {
      const response = await callback(props);

      // check if response data is json
      if (
        options.responseType === "json" &&
        typeof response.data !== "object"
      ) {
        throw new Error("Response data is not JSON");
      }

      return { response: response.data, errors: null };
    } catch (error) {
      return {
        errors: errorParser(error as AxiosError<{ error: string }>),
        response: null,
      };
    }
  };
