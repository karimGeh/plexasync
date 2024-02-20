import { RequestHandler } from "express";

export type CustomRequestHandler<
  TRequest,
  TResponse,
  TQuery = Record<string, string>,
  TParams = Record<string, string>
> = RequestHandler<TParams, TResponse, TRequest, TQuery>;
