import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models";

export interface UserPayload {
  id: string;
}

export const currentUser = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.headers?.authorization) {
    req.auth_user = null;
    return next();
  }

  try {
    const payload = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT__AUTH_SECRET_KEY
    ) as UserPayload;

    req.auth_user = await UserModel.get_user_by_id(payload.id);
  } catch (err) {
    req.auth_user = null;
  }

  next();
};
