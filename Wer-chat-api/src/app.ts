import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  RawServerDefault,
} from "fastify";
import registerRoutes from "./modules/router";
import fastifyJwt from "@fastify/jwt";
import dbClient from "./plugins/dbClient";
import firebaseAdminPlugin from "./plugins/firebaseAdminPlugin";
import authPlugin from "./plugins/authPlugin";

const fastify: FastifyInstance = Fastify({
  logger: false,
});
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "your-secret-key",
});
fastify.register(dbClient);
fastify.register(registerRoutes);
fastify.register(firebaseAdminPlugin);
// fastify.register(authPlugin);

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: 3031, host: "0.0.0.0" });
    fastify.log.info(`Server is listening on http://localhost:3031`);
    console.log(`Server is listening on http://localhost:3031`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
