import db from "../db";
import { v4 as uuidv4 } from "uuid";

// types
import { UserType } from "../types";
import { Password } from "../helpers/password";

export class UserModel {
  static async create_user({
    username,
    password,
  }: Pick<UserType, "username" | "password">): Promise<UserType> {
    const hash_password = await Password.toHash(password);
    const user = await db.pool.query<UserType>(
      "INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *",
      [uuidv4(), username, hash_password]
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
