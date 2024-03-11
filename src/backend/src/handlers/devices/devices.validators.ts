import { body } from "express-validator";
const createDeviceValidator = [
  body("name")
    .isString()
    .isLength({ min: 3, max: 255 })
    .withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .isLength({ min: 3, max: 255 })
    .withMessage("Description must be a string"),
  body("ip_address")
    .isString()
    .isLength({ min: 7, max: 15 })
    .withMessage("Invalid IP address"),
  body("tags").isArray().optional(),
  body("tags.*").isString().withMessage("Tag must be a string"),
  body("cover").optional().isString(),
];

export const DevicesValidators = {
  createDeviceValidator,
};
