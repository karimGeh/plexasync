import { CustomError, CustomErrorType } from "./custom-error";
import { ErrorCode } from "./error-code-dictionary";
export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(
    public message: string,
    public field?: string,
    public code?: ErrorCode
  ) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): CustomErrorType[] {
    return [{ message: this.message, field: this.field, code: this.code }];
  }
}
