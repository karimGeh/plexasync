import { UserType } from "../../models";

export interface GetMeResponseType {
  success: boolean;
  user: UserType;
}

export interface SignInResponseType {
  success: boolean;
  user: UserType;
  auth_token: string;
}

export interface VerifyTokenResponseType {
  success: boolean;
  token: string;
  user: UserType;
}
