export const loginSuccessResponseSchema = {
  type: "object",
  description: "Login success response",
  properties: {
    accessToken: {
      type: "string",
      description: "JWT access token",
    },
    refreshToken: {
      type: "string",
      description: "JWT refresh token",
    },
    userId: {
      type: "number",
      description: "User Identity",
    },
  },
  required: ["accessToken", "refreshToken", "userId"],
};

export const refreshTokenSuccessResponseSchema = {
  type: "object",
  description: "Refresh token success response",
  properties: {
    accessToken: {
      type: "string",
      description: "New JWT access token",
    },
  },
  required: ["accessToken"],
};
