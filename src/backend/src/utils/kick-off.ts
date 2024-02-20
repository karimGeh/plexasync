export type RequiredEnvVarsKeys =
  | "DB__HOST"
  | "DB__PORT"
  | "DB__USER"
  | "DB__PASSWORD"
  | "DB__NAME"
  //
  | "DB__CONNECTION_EXPB_MAX_ATTEMPTS"
  | "DB__CONNECTION_EXPB_FACTOR"
  | "DB__CONNECTION_EXPB_MIN_WAIT_TIME"
  //
  | "PORT"
  //
  | "JWT__AUTH_SECRET_KEY"
  | "JWT__EXPIRATION_TIME";

export const RequiredDBRelatedEnvVars: RequiredEnvVarsKeys[] = [
  "DB__HOST",
  "DB__PORT",
  "DB__USER",
  "DB__PASSWORD",
  "DB__NAME",

  "DB__CONNECTION_EXPB_MAX_ATTEMPTS",
  "DB__CONNECTION_EXPB_FACTOR",
  "DB__CONNECTION_EXPB_MIN_WAIT_TIME",
];

export const RequiredEnvVars: RequiredEnvVarsKeys[] = [
  ...RequiredDBRelatedEnvVars,
  "PORT",

  "JWT__AUTH_SECRET_KEY",
  "JWT__EXPIRATION_TIME",
];

export const DefaultEnvVars: Record<string, string> = {
  PORT: "5000",

  JWT__AUTH_SECRET_KEY: "very_secret_key",
  JWT__EXPIRATION_TIME: "8h",

  DB_PORT: "5432",

  DB__CONNECTION_EXPB_MAX_ATTEMPTS: "3",
  DB__CONNECTION_EXPB_FACTOR: "2",
  DB__CONNECTION_EXPB_MIN_WAIT_TIME: "2000",

  ENABLE_DB_ENV_VARS_OVERRIDE: "true",
};

export const databaseParamsCheck = (): void => {
  for (const envVar of RequiredDBRelatedEnvVars) {
    if (!process.env[envVar] && DefaultEnvVars[envVar]) {
      process.env[envVar] = DefaultEnvVars[envVar];
    } else if (!process.env[envVar]) {
      throw new Error(`${envVar} is not set`);
    }
  }
};

export const environmentCheck = (): void => {
  for (const envVar of RequiredEnvVars) {
    if (!process.env[envVar] && DefaultEnvVars[envVar]) {
      process.env[envVar] = DefaultEnvVars[envVar];
    } else if (!process.env[envVar]) {
      throw new Error(`${envVar} is not set`);
    }
  }
};
