export interface GetMeRequestType {}

export interface SignInRequestType {
  username: string;
  password: string;
}

export interface VerifyTokenRequestType {
  auth_token: string;
}
