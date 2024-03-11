import db from "../db";
import { isValidProtocolParams } from "../helpers/protocolParamsVerifier";
import { Protocols } from "../types/Enums";
import fs from "fs";
import path from "path";
import { DriverType } from "../types/models";

export class DriverModel {
  static async createDriver(driver: DriverType<Protocols>) {
    const result = await db.pool.query<DriverType<Protocols>>(
      `INSERT INTO drivers (id, software_version, hardware_version, protocol, default__protocol_params, device_params, default__communication_settings, configuration, tags)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        driver.id,
        driver.software_version,
        driver.hardware_version,
        driver.protocol,
        JSON.stringify(driver.default__protocol_params),
        JSON.stringify(driver.device_params),
        JSON.stringify(driver.default__communication_settings),
        JSON.stringify(driver.configuration),
        driver.tags,
      ]
    );

    return result.rows[0];
  }

  static async createDriverFromJSONFile(
    driver_id: string
  ): Promise<DriverType<Protocols>> {
    const file_path = path.join(
      __dirname,
      `../uploads/drivers/${driver_id}.json`
    );

    const file_content = JSON.parse(
      fs.readFileSync(file_path, "utf-8")
    ) as DriverType<Protocols>;

    if (
      // validate file content
      !file_content.software_version ||
      !file_content.hardware_version ||
      !file_content.protocol ||
      !file_content.default__protocol_params ||
      !file_content.device_params ||
      !file_content.default__communication_settings ||
      !file_content.configuration ||
      !file_content.tags ||
      //   protocol validation
      !Object.keys(Protocols).includes(file_content.protocol) ||
      !isValidProtocolParams({
        protocol: file_content.protocol,
        protocol_params: file_content.default__protocol_params,
      })
    ) {
      throw new Error("Invalid file content");
    }

    const driver = await DriverModel.createDriver({
      ...file_content,
      id: driver_id,
    });

    return driver;
  }

  static async getDriverById(
    driver_id: string
  ): Promise<DriverType<Protocols>> {
    const result = await db.pool.query<DriverType<Protocols>>(
      `SELECT * FROM drivers WHERE id = $1`,
      [driver_id]
    );

    return result.rows[0];
  }
}
