import db from "../db";
import { v4 as uuidv4 } from "uuid";

// types
import { UserType } from "../types";

export class UserModel {
  static async create_table(): Promise<void> {
    await db.pool.query(
      `CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )`
    );
  }

  static async create_user(
    username: string,
    password: string
  ): Promise<UserType> {
    const user = await db.pool.query<UserType>(
      "INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *",
      [uuidv4(), username, password]
    );

    return user.rows[0];
  }

  static async get_user_by_id(id: string): Promise<UserType | null> {
    const user = await db.pool.query<UserType>(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    return user.rows[0] || null;
  }

  static async get_user_by_username(
    username: string
  ): Promise<UserType | null> {
    const user = await db.pool.query<UserType>(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    return user.rows[0] || null;
  }
}
