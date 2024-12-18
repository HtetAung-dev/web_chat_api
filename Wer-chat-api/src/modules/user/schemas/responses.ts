const userDetailResponseSchema = {
  type: "object",
  description: "User detail",
  properties: {
    status: {
      type: "boolean",
    },
    data: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        email: { type: "string" },
        profile_picture_url: { type: "string" },
        google_id: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
      required: [
        "id",
        "name",
        "email",
        "profile_picture_url",
        "google_id",
        "createdAt",
        "updatedAt",
      ],
    }
  }, required: ["status", "data"]
};

const allUsersResponseSchema = {
  type: "object",
  description: "Array of user details",
  properties: {
    status: {
      type: "boolean",
      description: "Indicates if the response is successful",
      const: true, // Ensures the status must be true
    },
    users: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          email: { type: "string" },
          profile_picture_url: { type: "string" },
          google_id: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  required: ["status", "users"],
};

export { allUsersResponseSchema, userDetailResponseSchema };
