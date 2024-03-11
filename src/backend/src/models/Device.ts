import db from "../db";
import { Device } from "../types";
import { v4 as uuid } from "uuid";

export class DeviceModel {
  static async createDevice({
    name,
    description,
    ip_address,
    tags,
    cover = "",
  }: Omit<Device, `id`>) {
    const device = await db.pool.query<Device>(
      `INSERT INTO devices (
        id,
        name,
        description,
        ip_address,
        tags,
        cover
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [uuid(), name, description, ip_address, tags, cover]
    );

    return device.rows[0];
  }

  static async getDeviceById(id: string) {
    const device = await db.pool.query<Device>(
      `SELECT * FROM devices WHERE id = $1`,
      [id]
    );

    return device.rows[0];
  }

  static async getDevices({
    page,
    limit = 10,
    sort = "created_at",
  }: {
    page?: number;
    limit?: number;
    sort?: string;
  }) {
    const devices = await db.pool.query<Device>(
      `SELECT * FROM devices ORDER BY $1`, //LIMIT $2 OFFSET $3
      [sort] //limit, page * limit
    );

    return devices.rows;
  }
}
