import { FastifyInstance } from "fastify";
import userRoutes from "./user/userRoutes";
import authRoutes from "./authentication/authenticationRoutes";
import messageRoutes from "./message/messageRoutes";
import chatroomRoutes from "./chatroom/chatroomRoutes";

async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(messageRoutes, { prefix: "/messages"});
  fastify.register(chatroomRoutes, {prefix: "/chatrooms"})
}

export default registerRoutes;
