import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import config from "../config/setting";

export const postgresConnection = postgres({
  host: config.docker.managedDb.postgreSql.host,
  user: config.docker.managedDb.postgreSql.user,
  password: config.docker.managedDb.postgreSql.password,
  database: config.docker.managedDb.postgreSql.database,
  port: parseInt(config.docker.managedDb.postgreSql.port as string, 10),
  // ssl: {
  // rejectUnauthorized: config.digitalOcean.managedDb.postgreSql.sslMode === "require",
  // },
  max: 20,
  idle_timeout: 20,
});

export const postgresDb = drizzle(postgresConnection, { casing: "snake_case" });
export { schema };
