import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  if (!req.auth_user) {
    throw new NotAuthorizedError();
  }

  next();
};
