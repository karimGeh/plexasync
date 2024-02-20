import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { UploadDriverFileHandlerType } from "../../types/API/drivers";
import { BadRequestError } from "../../errors/bad-request-error";
import { DriverModel } from "../../models/Driver";

const uploadDriverFile: UploadDriverFileHandlerType = async (req, res) => {
  const driver_id = uuidv4();

  // Create a storage object with a destination and filename
  const storage = multer.diskStorage({
    destination: function (_, __, cb) {
      const dir = path.join(__dirname, `../uploads/drivers`);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (_, __, cb) => cb(null, `${driver_id}.json`),
  });

  // Create a multer object with the storage object and a file filter
  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      if (file.mimetype !== "application/json") {
        return cb(new BadRequestError("Invalid file type", "file"));
      }
      cb(null, true);
    },
  }).single("file");

  // Use the multer object to upload the file
  const isUploaded = await new Promise((resolve) => {
    upload(req, res, (err) => {
      resolve(
        !err &&
          fs.existsSync(
            path.join(__dirname, `../uploads/drivers/${driver_id}.json`)
          )
      );
    });
  });

  if (!isUploaded)
    throw new BadRequestError("Could not upload driver.", "file");

  const driver = await DriverModel.createDriverFromJSONFile(driver_id);

  if (!driver) throw new BadRequestError("Could not parse driver.", "file");

  res.send({
    success: true,
    driver,
  });
};

export const DriversHandlers = {
  uploadDriverFile,
};
