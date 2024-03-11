import db from "../db";
import { HMI } from "../types";
import { v4 as uuid } from "uuid";

export class HMIModel {
  static async createHMI({
    name,
    description,
    frontend_layout,
    tags,
    cover = "",
  }: Omit<HMI, `id` | "created_at" | "updated_at">) {
    const hmi = await db.pool.query<HMI>(
      `INSERT INTO hmi (
        id,
        name,
        description,
        frontend_layout,
        tags,
        cover,
        variables
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [uuid(), name, description, frontend_layout, tags, cover, []]
    );

    return hmi.rows[0];
  }

  static async getHMIById(id: string) {
    const hmi = await db.pool.query<HMI>(`SELECT * FROM hmi WHERE id = $1`, [
      id,
    ]);

    return hmi.rows[0];
  }

  static async getHMIs({
    page,
    limit = 10,
    sort = "created_at",
  }: {
    page?: number;
    limit?: number;
    sort?: string;
  }) {
    const hmi = await db.pool.query<HMI>(
      `SELECT * FROM hmi ORDER BY $1`, //LIMIT $2 OFFSET $3
      [sort] //limit, page * limit
    );

    return hmi.rows;
  }

  static async updateHMIVariables(hmi_id: string, variables: string[]) {
    const hmi = await db.pool.query<HMI>(
      `UPDATE hmi SET variables = $1 WHERE id = $2 RETURNING *`,
      [variables, hmi_id]
    );

    return hmi.rows[0];
  }
}
