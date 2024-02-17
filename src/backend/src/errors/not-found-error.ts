import { CustomError, CustomErrorType } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string = "404 Not Found") {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): CustomErrorType[] {
    return [{ message: this.message }];
  }
}
