import { FastifyInstance } from "fastify";
import messageController from "./messageController";
import { allMessageSchema, detailMessageSchema } from "./schemas/response";

const TAGS: string[] = ["/messages"];

async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get(
    "/",
    {
      schema: {
        tags: TAGS,
        response: {
          200: allMessageSchema,
          500: {
            type: "object",
            properties: {
              status: { type: "boolean" },
              error: { type: "string" },
            },
            required: ["status", "error"],
          },
        },
      },
    },
    messageController.getChatroomMessages
  );
}

export default routes;
