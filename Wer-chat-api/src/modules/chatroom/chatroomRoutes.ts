import { FastifyInstance } from "fastify";
import chatroomController from "./chatroomController";
import { getUserChatroomSchema } from "./schemas/response";

const TAGS = ["chatrooms"];

async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get(
    "/",
    {
      schema: {
        tags: TAGS,
        response: {
          200: getUserChatroomSchema,
          401: {
            type: "object",
            properties: {
              status: {type: "boolean"},
              message: { type: "string" },
            },
          },
        },
      },
    },
    chatroomController.getUserChatroom
  );

  
}

export default routes;
