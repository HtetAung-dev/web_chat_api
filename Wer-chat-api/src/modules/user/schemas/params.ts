const getUserQuerySchema = {
  type: "object",
  description: "Get user by credential.",
  properties: {
    credential: { type: "string" },
  },
  required: ["credential"],
};

export { getUserQuerySchema };
