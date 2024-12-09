import { FastifyInstance } from "fastify";
import { loginBodySchema, refreshTokenBodySchema } from "./schemas/params";
import {
  loginSuccessResponseSchema,
  refreshTokenSuccessResponseSchema,
} from "./schemas/responses";
import authenticationController from "./authenticationController";

const TAGS = ["auth"];

async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.post(
    "/login",
    {
      schema: {
        tags: TAGS,
        body: loginBodySchema,
        response: {
          200: loginSuccessResponseSchema,
          401: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    authenticationController.login
  );

  fastify.post(
    "/refresh-token",
    {
      schema: {
        tags: TAGS,
        body: refreshTokenBodySchema,
        response: {
          200: refreshTokenSuccessResponseSchema,
          401: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    authenticationController.refreshAccessToken
  );
}

export default routes;
