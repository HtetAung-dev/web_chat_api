const detailMessageSchema = {
    type: "object",
    description: "Message detail",
    properties: {
      id: { type: "number" },
      room_id: { type: "number" },
      sender_id: { type: "number" },
      message_content: { type: "string" },
      message_type: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
      isRead: { type: "boolean" },
      flags: {
        type: "object",
        properties: {
          isPinned: { type: "boolean" },
          isEdited: { type: "boolean" },
          isDeleted: { type: "boolean" },
        },
        required: ["isPinned", "isEdited", "isDeleted"],
      }
    },
    required: [
      "id",
      "room_id",
      "sender_id",
      "message_content",
      "message_type",
      "createdAt",
      "isRead",
      "flags"
    ],
  };

  const allMessageSchema = {
    type: "object",
    description: "Array of message details",
    properties: {
      status: {
        type: "boolean",
        description: "Indicates if the response is successful",
        const: true, // Ensures the status must be true
      },
      data: {
        type: "array",
        items: detailMessageSchema,
      },
    },
    required: ["status", "data"],
  };


  
  export { detailMessageSchema, allMessageSchema };
  