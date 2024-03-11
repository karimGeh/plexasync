import { CustomRequestHandler } from "..";
import { UploadDriverFileRequestType } from "./requests";
import { UploadDriverFileResponseType } from "./responses";

export type UploadDriverFileHandlerType = CustomRequestHandler<
  UploadDriverFileRequestType,
  UploadDriverFileResponseType
>;
