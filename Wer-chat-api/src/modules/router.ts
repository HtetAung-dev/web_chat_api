import { FastifyInstance } from "fastify";
import userRoutes from "./user/userRoutes";
import authRoutes from "./authentication/authenticationRoutes";
import messageRoutes from "./message/messageRoutes";

async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(messageRoutes, { prefix: "/messages"})
}

export default registerRoutes;
