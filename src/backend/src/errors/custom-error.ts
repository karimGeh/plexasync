import { ErrorCode } from "./error-code-dictionary";
export interface CustomErrorType {
  message: string;
  field?: string;
  code?: ErrorCode;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): CustomErrorType[];
}
