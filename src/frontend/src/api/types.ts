export enum APIMainRoutes {
  ASSETS = "assets",
  ORGANIZATIONS = "organizations",
  PROJECTS = "projects",
  ROOTS = "roots",
  URLS = "urls",
  VULNS = "vulns",
}

export interface RequestWithQueryParams {
  query_params?: Record<string, string | number | boolean>;
}

export interface CustomError {
  message: string;
  field?: string;
  code?: string;
}

export interface ValidResponse<TResponse> {
  response: TResponse;
  errors: null;
}

export interface ErroneousResponse<TError = CustomError> {
  errors: TError[];
  response: null;
}

// eslint-disable-next-line
export type APIResponse<TResponse = any, TError = CustomError> =
  | ValidResponse<TResponse>
  | ErroneousResponse<TError>;
