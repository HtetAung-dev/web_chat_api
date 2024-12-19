import userRepository from "../user/userRepository";
import { FastifyReply } from "fastify";
import { MessageType } from "./types/messageType";
import { ContentType } from "./types/contentType";
import messageRepository from "./messageRepository";
import { Message } from "./models/message";
import chatroomRepository from "../chatroom/chatroomRepository";

type MessageResponse = {
  status: boolean;
  data?: MessageType;
  message?: string;
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
      console.error(e);
      return {status: false, message: "Error in getting Chatroom. Error: " + e};
    }
  }

  async sendMessage(message: MessageType) {
    try {
      const checkUser = await chatroomRepository.getUserPermission(message.room_id, message.sender_id);
      if(!checkUser) return {status: false, message: "User not exit in the chatroom!"}
      const newMessage = await messageRepository.createMessage(message);
      if (!newMessage) {
        return {status: false, message:"Message not sent" };
      }
      return { status: true, data: newMessage };
    } catch (error: any) {
      return {status: false, message:error};
    }
  }
  
  async readMessage(messageId: number): Promise<MessageResponse> {
    try {
      const updatedMessage = await messageRepository.readMessage(messageId);
      if (!updatedMessage) {
        return {status: false, message: "Error in reading message."};
      }
      return {status: true, data: updatedMessage};
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new MessageService();
