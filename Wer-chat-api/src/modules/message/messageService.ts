import userRepository from "../user/userRepository";
import { FastifyReply } from "fastify";
import { MessageType } from "./types/messageType";
import { ContentType } from "./types/contentType";
import messageRepository from "./messageRepository";
import { Message } from "./models/message";

type MessageResponse = {
  status: boolean;
  data: MessageType
}

class MessageService {
  async getChatroomMessage(
    roomId: number,
    limit: number,
    page: number
  ): Promise<any> {
    try {
      
      const message: MessageType[] =
        await messageRepository.getChatroomMessage(roomId, limit, page);
      return message.map(Message.fromMessageType);
    } catch (e) {
      throw new Error("Error in getting Chatroom. Error: " + e);
    }
  }

  async sendMessage(message: MessageType) {
    try {
      const newMessage = await messageRepository.createMessage(message);
      if (!newMessage) {
        throw new Error("Error in sending message.");
      }
      return { status: true, data: newMessage };
    } catch (error: any) {
      throw new Error(error);
    }
  }
  
  async readMessage(messageId: number): Promise<MessageResponse> {
    try {
      const updatedMessage = await messageRepository.readMessage(messageId);
      if (!updatedMessage) {
        throw new Error("Error in reading message.");
      }
      return {status: true, data: updatedMessage};
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new MessageService();
