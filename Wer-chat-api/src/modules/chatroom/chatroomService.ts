import chatroomRepository from "./chatroomRepository";
import userRepository from "../user/userRepository";
import { ChatRoomUserType } from "./types/chatRoomUserType";
import { ChatroomType } from "./types/chatroomType";
import { FastifyReply } from "fastify";
import { ChatroomUsers } from "./models/chatroomUsers";
import { Chatroom } from "./models/chatroom";

class ChatroomService{
  async getChatroomByUser(userId: number): Promise<any> {
    try {
      const chatroom: ChatRoomUserType[] = await chatroomRepository.getChatroomByUser(userId);
      return chatroom.map(ChatroomUsers.fromChatroomUsersType);
    } catch (e) {
      throw new Error("Error in getting Chatroom. Error: " + e);
    }
  }

  async getChatroomById(chatroomId: number): Promise<Chatroom> {
    try {
      const chatroom: ChatroomType | null = await chatroomRepository.getChatroomById(chatroomId);
      if (chatroom) {
        return Chatroom.fromChatroomType(chatroom);
      } else {
        throw new Error("Chatroom not found.");
      }
    } catch (e) {
      throw new Error("Error in getting Chatroom. Error: " + e);
    }
  }

  async createChatroom(chatroom: Chatroom, senderId: number, receiverId: number): Promise<ChatRoomUserType[]> {
    try {
      const newChatroom: Chatroom = await chatroomRepository.createChatroom(chatroom);
      if(newChatroom){
        const chatroomUsers: ChatroomUsers[] = [
          new ChatroomUsers(newChatroom.id!, senderId, 'admin', new Date(), new Date()),
          new ChatroomUsers(newChatroom.id!, receiverId, 'member', new Date(), new Date()),
        ];
        const joinedChat = await chatroomRepository.addUsersToChatroom(chatroomUsers)
        if(joinedChat){
          console.log("chatroom created successfully")
          const chatroom = await chatroomRepository.getChatroomUsersById(newChatroom.id!)
          return chatroom;

        } else {
          throw new Error("Error in joining Chatroom.");
        }
      }
    } catch (e) {
      throw new Error("Error in creating Chatroom. Error: " + e);
    }
  }
}

export default new ChatroomService();
