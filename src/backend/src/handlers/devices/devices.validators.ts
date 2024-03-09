import { body } from "express-validator";
import { DriverModel } from "../../models";

const createDeviceValidator = [
  body("driver_id").exists().isString().withMessage("Driver ID is required"),
  body("driver_id")
    .custom(async (driver_id, { req }) => {
      if (!driver_id) return Promise.resolve();
      const driver = await DriverModel.getDriverById(driver_id);
      if (!driver) return Promise.reject("Driver not found");
      req.driver = driver;
      return Promise.resolve();
    })
    .withMessage("Driver not found"),
  body("name")
    .exists()
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage("Name is required"),
  body("ip_address")
    .exists()
    .isArray({ min: 4, max: 4 })
    .withMessage("IP address is required")
    .custom((ip_address: number[]) => {
      if (!ip_address?.every((octet) => typeof octet === "number"))
        return Promise.reject("Invalid IP address");
      if (ip_address.some((octet) => octet < 0 || octet > 255))
        return Promise.reject("Invalid IP address");
      return Promise.resolve();
    }),
  body("port")
    .exists()
    .isInt({ min: 0, max: 65535 })
    .withMessage("Port is required"),
  body("protocol_params")
    .exists()
    .isObject()
    .withMessage("Protocol params is required"),
  body("tags")
    .optional()
    .isArray()
    .custom((tags: any[]) => {
      if (!tags.every((tag) => typeof tag === "string"))
        return Promise.reject("Tags must be an array of strings");
      return Promise.resolve();
    })
    .withMessage("Tags must be an array of strings"),
];

export const DevicesValidators = {
  createDeviceValidator,
};
