import { body } from "express-validator";
import { UserModel } from "../../models";

const signInValidator = [
  body("username")
    .exists()
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("Invalid username."),
  body("username").custom(async (username: string, { req }: { req: any }) => {
    if (!username) {
      throw new Error("Invalid username.");
    }
    const user = await UserModel.get_user_by_username(username);
    if (!user) {
      throw new Error("No user with that username exists.");
    }

    req.req__user = user;
  }),
  body("password")
    .exists()
    .isString()
    .isLength({ min: 6, max: 20 })
    .withMessage("Invalid password."),
];

const verifyTokenValidator = [
  body("auth_token").exists().isString().withMessage("Invalid token."),
];

export const AuthValidators = {
  signInValidator,
  verifyTokenValidator,
};
