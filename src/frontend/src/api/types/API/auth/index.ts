import { CustomRequestHandler } from "..";
import {
  GetMeRequestType,
  SignInRequestType,
  VerifyTokenRequestType,
} from "./requests";
import {
  GetMeResponseType,
  SignInResponseType,
  VerifyTokenResponseType,
} from "./responses";

export type GetMeHandlerType = CustomRequestHandler<
  GetMeRequestType,
  GetMeResponseType
>;

export type SignInHandlerType = CustomRequestHandler<
  SignInRequestType,
  SignInResponseType
>;

export type VerifyTokenHandlerType = CustomRequestHandler<
  VerifyTokenRequestType,
  VerifyTokenResponseType
>;
