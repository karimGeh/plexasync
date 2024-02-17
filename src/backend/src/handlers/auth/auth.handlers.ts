// libraries
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

// errors
import { BadRequestError } from "../../errors/bad-request-error";

// models
import { UserModel } from "../../models";

// helpers
import { Password } from "../../helpers/password";

export const signInHandler: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.get_user_by_username(username);

  const isPasswordValid = await Password.compare(user.password, password);

  if (!isPasswordValid || !user) {
    throw new BadRequestError(
      "Invalid username or password. Please try again."
    );
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT__AUTH_SECRET_KEY);

  res.status(200).send({
    success: true,
    user,
    token,
  });
};

export const verifyTokenHandler: RequestHandler = async (req, res) => {
  const { auth_token } = req.body;

  const payload = jwt.verify(
    auth_token,
    process.env.JWT__AUTH_SECRET_KEY
  ) as Record<string, string>;

  const auth_user = await UserModel.get_user_by_id(payload.id);

  res.status(200).send({
    success: true,
    token: auth_token,
    user: auth_user,
  });
};

export const getMeHandler: RequestHandler = async (req, res) => {
  const { auth_user } = req;

  res.status(200).send({
    success: true,
    user: auth_user,
  });
};
