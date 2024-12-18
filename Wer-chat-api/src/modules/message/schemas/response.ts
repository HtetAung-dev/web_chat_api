const detailMessageSchema = {
  type: "object",
  properties: {
    status: {
      type: "boolean",
    },
    data:{
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
    updatedAt: { type: "string", format: "date-time" },
    isEdited: { type: "boolean" },
    isDeleted: { type: "boolean" },
    isPinned: { type: "boolean" },
  },
  required: [
    "id",
    "room_id",
    "sender_id",
    "message_content",
    "message_type",
    "createdAt",
    "isRead",
    "updatedAt",
    "isEdited",
    "isDeleted",
    "isPinned",
  ],
    }
  },
  
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
