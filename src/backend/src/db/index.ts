import { Pool } from "pg";
import { exponentialBackoff } from "../helpers/exponentialBackoff";

class Database {
  pool: Pool;

  async connect() {
    let connectAttempts = 0;

    while (
      !this.pool &&
      connectAttempts < Number(process.env.DB__CONNECTION_EXPB_MAX_ATTEMPTS)
    ) {
      try {
        const poolConfig = {
          host: process.env.DB__HOST,
          port: Number(process.env.DB__PORT),
          database: process.env.DB__NAME,
          user: process.env.DB__USER,
          password: process.env.DB__PASSWORD,
        };

        this.pool = new Pool(poolConfig);

        await this.pool.connect();
        break;
      } catch (err) {
        console.error(err);
        connectAttempts++;

        await exponentialBackoff({
          attempt_number: connectAttempts,
          minimum_wait_time: Number(
            process.env.DB_CONNECTION_EXPB_MIN_WAIT_TIME
          ),
          exponential_factor: Number(process.env.DB_CONNECTION_EXPB_FACTOR),
        });
      }
    }
  }
}

const db = new Database();

export default db;
