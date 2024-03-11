export interface RequestHandler<TParams, TResponse, TRequest, TQuery> {
  req: TRequest & { query_params?: TQuery };
  res: TResponse;
  params: TParams;
}

export type CustomRequestHandler<
  TRequest,
  TResponse,
  TQuery = Record<string, string>,
  TParams = Record<string, string>
> = RequestHandler<TParams, TResponse, TRequest, TQuery>;
