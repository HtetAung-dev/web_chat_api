import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { postgresDb } from "../db/drizzle";

async function dbConnector(fastify: FastifyInstance): Promise<void> {
  fastify.decorate("pg", postgresDb);
  console.log("Database connected");
}

export default fastifyPlugin(dbConnector);
