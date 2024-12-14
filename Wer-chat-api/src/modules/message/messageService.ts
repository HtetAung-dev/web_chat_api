import userRepository from "../user/userRepository";
import { FastifyReply } from "fastify";
import { MessageType } from "./types/messageType";
import { ContentType } from "./types/contentType";
import messageRepository from "./messageRepository";
import { Message } from "./models/message";

import { ChatroomType } from "../chatroom/types/chatroomType";
import chatroomRepository from "../chatroom/chatroomRepository";
import { Chatroom } from "../chatroom/models/chatroom";

class MessageService{
  async getChatroomMessage(roomId: number, limit:number, offset: number): Promise<any> {
    try {
      const chatroom: MessageType[] = await messageRepository.getChatroomMessage(roomId, limit, offset );
      return chatroom.map(Message.fromMessageType);
    } catch (e) {
      throw new Error("Error in getting Chatroom. Error: " + e);
    }
  }

  async sendMessage(message: MessageType ){
    try {
        const newMessage = await messageRepository.createMessage(message);
        if(!newMessage){
            throw new Error("Error in sending message.");
        }
        return {status: true, data: newMessage};
    } catch (error: any) {
        throw new Error(error);
    }
  }


//   async getOrCreatePrivateChat(senderId: number, receiverId: number): Promise<object> {
//     try {
//       const currentChatroom = await chatroomRepository.checkExistChat(senderId, receiverId);
//       if (currentChatroom) {
//         return currentChatroom;
//       }
//       const roomData: ChatroomType = {
//         name: `${senderId}-${receiverId}`,
//         type: 'private',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }
//       var roomUser: object = []
//       const newChatroom: Chatroom = await chatroomRepository.createChatroom(roomData);
//       if(!newChatroom){
//         throw new Error("Error in joining Chatroom.");
//       }

//         const chatroomUsers: ChatroomUsers[] = [
//           new ChatroomUsers(newChatroom.id!, senderId, 'admin', new Date(), new Date()),
//           new ChatroomUsers(newChatroom.id!, receiverId, 'member', new Date(), new Date()),
//         ];
//         const joinedChat = await chatroomRepository.addUsersToChatroom(chatroomUsers)
//         if(!joinedChat){
//           console.log("chatroom created successfully");
//           throw new Error("Error in joining Chatroom.");        
//         }
//          roomUser = await chatroomRepository.getChatroomUsersById(newChatroom.id!)
//           return roomUser;
//     } catch (e) {
//       throw new Error("Error in creating Chatroom. Error: " + e);
//     }
    
//   }
}

export default new MessageService();
