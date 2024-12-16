const getUserChatroomSchema = {
  type: "object",
  description: "Array of chatroom details",
  properties: {
    status: {
      type: "boolean",
      description: "Indicates if the response is successful",
      const: true, // Ensures the status must be true
    },
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          chatroom_id: { type: "string" },
          name: { type: "string" },
          chatroomType: { type: "string" },
          lastMessage: { type: "string" },
          isRead: { type: "boolean" },
          lastMessageTime: { type: "string", format: "date-time" },
          participants: { type: "array" },
        },
      },
    },
  },
  required: ["status", "data"],
};

export {getUserChatroomSchema}