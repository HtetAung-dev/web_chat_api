import { FastifyInstance } from "fastify";
import userController from "./userController";
import {
  allUsersResponseSchema,
  userDetailResponseSchema,
} from "./schemas/responses";
import { getUserQuerySchema } from "./schemas/params";

const TAGS: string[] = ["/users"];

async function routes(fastify: FastifyInstance): Promise<void> {
    fastify.get(
      "/detail/:id",
      {
        schema: {
          tags: TAGS,
          response: {
            200: userDetailResponseSchema,
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
        // onRequest: [fastify.authenticate],
      },
      userController.getUserById
    );

  fastify.get(
    "/",
    {
      schema: {
        tags: TAGS,
        response: {
          200: allUsersResponseSchema,
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
    userController.getUsers
  );
}

export default routes;
