import { FastifyInstance } from "fastify";
import userRoutes from "./user/userRoutes";
import authRoutes from "./authentication/authenticationRoutes";

async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(userRoutes, { prefix: "/users" });
}

export default registerRoutes;
