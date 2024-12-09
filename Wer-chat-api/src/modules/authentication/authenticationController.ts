import { FastifyReply, FastifyRequest } from "fastify";
import AuthenticationService from "./authenticationService";
import { AuthResponse } from "./models/authResponse";
import { RefreshTokenResponse } from "./models/refreshTokenResponse";

export type LoginBodyType = {
  idToken: string;
};

export type RefreshTokenBodyType = {
  refreshToken: string;
};

class AuthenticationController {
  async login(
    req: FastifyRequest<{ Body: LoginBodyType }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { idToken } = req.body;
      const response: AuthResponse = await AuthenticationService.login(
        req.server,
        idToken
      );
      reply.status(200).send(response);
    } catch (error) {
      console.error("Error in login controller:", error);
      reply.status(401).send({ message: "Authentication failed" });
    }
  }

  async refreshAccessToken(
    req: FastifyRequest<{ Body: RefreshTokenBodyType }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const response: RefreshTokenResponse =
        await AuthenticationService.refreshAccessToken(
          req.server,
          refreshToken
        );
      reply.status(200).send(response);
    } catch (error) {
      console.error("Error in refresh token controller:", error);
      reply.status(401).send({ message: "Invalid refresh token" });
    }
  }
}

export default new AuthenticationController();
