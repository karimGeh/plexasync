import { Protocols } from "../../Enums";
import { DriverType } from "../../models";

export interface UploadDriverFileResponseType {
  success: boolean;
  driver: DriverType<Protocols>;
}
