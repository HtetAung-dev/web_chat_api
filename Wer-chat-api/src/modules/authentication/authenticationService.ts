import { FastifyInstance } from "fastify";
import { AuthResponse } from "./models/authResponse";
import { RefreshTokenResponse } from "./models/refreshTokenResponse";
import { User } from "./models/user";
import AuthenticationRepository from "./authenticationRepository";
import { UserType } from "../user/types/userType";

interface JwtPayload {
  id: number;
  email: string;
  username: string;
  type?: "refresh";
}

const currentDate = new Date();

class AuthenticationService {
  async login(
    fastify: FastifyInstance,
    idToken: string
  ): Promise<AuthResponse> {
    try {
      let payload: JwtPayload;
      let userId: number;
      // Verify ID token
      const userInfo = await fastify.firebaseAuth.verifyIdToken(idToken);
      if (!userInfo.email) {
        throw new Error("Email not found in token");
      }

      // Check this email address is existing
      const existUser = (await AuthenticationRepository.getUserByEmail(
        userInfo.email
      )) as UserType | null;

      if (existUser != null) {
        userId = existUser!.id!;
        // Create JWT Token
        payload = {
          id: existUser!.id!,
          email: existUser!.email,
          username: existUser!.name,
        };
      } else {
        console.log("Right here in new session");
        // Create new user
        const user = new User(
          userInfo.name,
          userInfo.email,
          "",
          userInfo.uid,
          currentDate,
          currentDate
        );

        // add to User Table
        const result = await AuthenticationRepository.createUser(user);

        userId = result!.id!;
        // Create JWT Token
        payload = {
          id: userInfo.id,
          email: userInfo.email,
          username: userInfo.name,
        };
      }

      const accessToken = fastify.jwt.sign(payload, { expiresIn: "1h" });

      const refreshPayload: JwtPayload = {
        ...payload,
        type: "refresh",
      };

      const refreshToken = fastify.jwt.sign(refreshPayload, {
        expiresIn: "7d",
      });

      return new AuthResponse(accessToken, refreshToken, userId);
    } catch (error) {
      fastify.log.error("Error in login service:", error);
      throw new Error("Invalid ID token");
    }
  }

  async refreshAccessToken(
    fastify: FastifyInstance,
    refreshToken: string
  ): Promise<RefreshTokenResponse> {
    try {
      const decoded = fastify.jwt.verify<JwtPayload>(refreshToken);
      if (decoded.type !== "refresh") {
        throw new Error("Invalid token type");
      }

      const payload: JwtPayload = {
        id: decoded.id,
        email: decoded.email,
        username: "",
      };

      const accessToken = fastify.jwt.sign(payload, { expiresIn: "1h" });

      return new RefreshTokenResponse(accessToken);
    } catch (error) {
      fastify.log.error("Error in refresh token service:", error);
      throw new Error("Invalid refresh token");
    }
  }
}

export default new AuthenticationService();
