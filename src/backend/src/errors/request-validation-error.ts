import { ValidationError } from "express-validator";
import { CustomError, CustomErrorType } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): CustomErrorType[] {
    return this.errors.map((err) => {
      return {
        message: err.msg,
        field: err.type === "field" ? err.path : undefined,
      };
    });
  }
}
