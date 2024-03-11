import db from "../db";
import { Variable, Protocols } from "../types";
import { v4 as uuid } from "uuid";

export class VariableModel {
  static async createVariable({
    name,
    description,
    port,
    scale_factor,
    unit,
    offset_factor,
    device_id,
    protocol_params,
    protocol,
    tags,
  }: Omit<Variable<Protocols>, `id`>) {
    const variable = await db.pool.query<Variable<Protocols>>(
      `INSERT INTO variables (
        id,
        name,
        description,
        port,
        scale_factor,
        unit,
        offset_factor,
        device_id,
        protocol_params,
        protocol,
        tags,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        uuid(),
        name,
        description || "",
        port,
        scale_factor,
        unit,
        offset_factor,
        device_id,
        JSON.stringify(protocol_params),
        protocol,
        tags || [],
        new Date().toISOString(),
        new Date().toISOString(),
      ]
    );

    return variable.rows[0];
  }

  static async getVariableById(id: string) {
    const variable = await db.pool.query<Variable<Protocols>>(
      `SELECT * FROM variables WHERE id = $1`,
      [id]
    );

    return variable.rows[0];
  }

  static async getVariablesByDeviceId(device_id: string) {
    const variables = await db.pool.query<Variable<Protocols>>(
      `SELECT * FROM variables WHERE device_id = $1`,
      [device_id]
    );

    return variables.rows;
  }

  static async getVariablesByIdsList(ids: string[]) {
    const variables = await db.pool.query<Variable<Protocols>>(
      `SELECT * FROM variables WHERE id = ANY($1)`,
      [ids]
    );

    return variables.rows;
  }

  static async getVariables({
    page,
    limit = 10,
    sort = "created_at",
  }: {
    page?: number;
    limit?: number;
    sort?: string;
  }) {
    const variables = await db.pool.query<Variable<Protocols>>(
      `SELECT * FROM variables ORDER BY $1`, //LIMIT $2 OFFSET $3
      [sort] //limit, page * limit
    );

    return variables.rows;
  }
}
