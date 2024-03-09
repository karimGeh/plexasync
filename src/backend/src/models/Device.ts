import db from "../db";
import { DeviceType } from "../types";
import { Protocols } from "../types/Enums";
import { v4 as uuid } from "uuid";

export class DeviceModel {
  static async createDevice({
    name,
    driver_id,
    configuration,
    ip_address,
    port,
    protocol_params,
    communication_settings,
    params,
    protocol,
    tags,
    cover_uri = "",
  }: Omit<DeviceType<Protocols>, `id`>) {
    const device = await db.pool.query<DeviceType<Protocols>>(
      `INSERT INTO devices (
        id,
        name,
        driver_id,
        cover_uri,
        ip_address,
        port,
        protocol,
        protocol_params,
        params,
        communication_settings,
        configuration,
        tags
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        uuid(),
        name,
        driver_id,
        cover_uri,
        ip_address,
        port,
        protocol,
        JSON.stringify(protocol_params),
        JSON.stringify(params),
        JSON.stringify(communication_settings),
        JSON.stringify(configuration),
        tags || [],
      ]
    );

    return device.rows[0];
  }

  static async getDeviceById(id: string) {
    const device = await db.pool.query<DeviceType<Protocols>>(
      `SELECT * FROM devices WHERE id = $1`,
      [id]
    );

    return device.rows[0];
  }

  static async getDevices({
    page,
    limit,
    sort,
  }: {
    page?: number;
    limit?: number;
    sort?: string;
  }) {
    const devices = await db.pool.query<DeviceType<Protocols>>(
      `SELECT * FROM devices ORDER BY $1 LIMIT $2 OFFSET $3`,
      [sort, limit, page * limit]
    );

    return devices.rows;
  }
}
