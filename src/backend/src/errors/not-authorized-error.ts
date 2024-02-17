import { CustomError, CustomErrorType } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string = "Not authorized") {
    super("Not Authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): CustomErrorType[] {
    return [{ message: this.message }];
  }
}
