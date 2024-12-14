const getUserQuerySchema = {
  type: "object",
  description: "Get user by id.",
  properties: {
    id: { type: "number" },
  },
  required: ["id"],
};

export { getUserQuerySchema };
