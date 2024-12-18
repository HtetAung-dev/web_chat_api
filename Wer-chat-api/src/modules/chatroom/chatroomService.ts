import chatroomRepository from "./chatroomRepository";
import userRepository from "../user/userRepository";
import { ChatRoomUserType } from "./types/chatRoomUserType";
import { ChatroomType } from "./types/chatroomType";
import { FastifyReply } from "fastify";
import { ChatroomUsers } from "./models/chatroomUsers";
import { Chatroom } from "./models/chatroom";
import { RoomTypes } from "./types/roomTypes";

class ChatroomService{
  async getChatroomByUser(userId: number, limit: number, page: number): Promise<any> {
    try {
      const chatroom: any = await chatroomRepository.getUserChatrooms(userId, limit, page);
      return chatroom;
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

  async getOrCreatePrivateChat(senderId: number, receiverId: number): Promise<any> {
    try {
      console.log(senderId, receiverId)
      const currentChatroom = await chatroomRepository.checkExistChat(senderId, receiverId);
      console.log(currentChatroom);
      if (currentChatroom) {
        // const memberList = await chatroomRepository.getChatroomUsersById(currentChatroom.id!)
        // return {status: true, chatroom: currentChatroom, members: memberList};
        const data = await chatroomRepository.getChatroomDetail(currentChatroom.id);
        return {status: true, chatroom: data};
      }
      const firstUser = await userRepository.getUserById(senderId);
      const secondUser = await userRepository.getUserById(receiverId);
      const roomData: ChatroomType = {
        name: `${firstUser?.name}-${secondUser?.name}`,
        type: 'private',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      var roomUser: object = []
      const newChatroom: Chatroom = await chatroomRepository.createChatroom(roomData);
      if(!newChatroom){
        throw new Error("Error in joining Chatroom.");
      }

        const chatroomUsers: ChatroomUsers[] = [
          new ChatroomUsers(newChatroom.id!, senderId, 'admin', new Date(), new Date()),
          new ChatroomUsers(newChatroom.id!, receiverId, 'admin', new Date(), new Date()),
        ];
        const joinedChat = await chatroomRepository.addUsersToChatroom(chatroomUsers)
        if(!joinedChat){
          console.log("chatroom created successfully");
          throw new Error("Error in joining Chatroom.");        
        }
          // roomUser = await chatroomRepository.getChatroomUsersById(newChatroom.id!)
          const data = await chatroomRepository.getChatroomDetail(newChatroom.id!);
          // return {status: true, chatroom: newChatroom, members: roomUser}
          return {status: true, chatroom: data};
    } catch (e) {
      throw new Error("Error in creating Chatroom. Error: " + e);
    }
    
  }

  async CreateGroupChat(name: string, creator: number, members: []): Promise<any> {
    try {
      const groupChat: Chatroom = new Chatroom(name, 'group', new Date(), new Date());
      const newChatroom = await chatroomRepository.createChatroom(groupChat);
      if(!newChatroom) throw new Error("chatroom created failed");
      const chatroomUsers: ChatroomUsers[] = [new ChatroomUsers(newChatroom.id!, creator, 'admin', new Date(), new Date())];
      members.map((member) => {
        chatroomUsers.push(new ChatroomUsers(newChatroom.id!, member, 'member', new Date(), new Date()));
      });

      const joinedMembers = await chatroomRepository.addUsersToChatroom(chatroomUsers);
      if(!joinedMembers) throw new Error("Error in joining Chatroom members");

      // const memberList = await chatroomRepository.getChatroomUsersById(newChatroom.id!);
      // return {status: true, chatroom: newChatroom, members: memberList};

      const data = await chatroomRepository.getChatroomDetail(newChatroom.id!);
      return {status: true, chatroom: data};
      
    } catch (e) {
      throw new Error("Error in creating Chatroom. Error: " + e);
    }    
  }
  // update group name
  async updateGroupName(roomId: number, name: string, userId: number): Promise<any>{
    console.log("Hello")
    try {
      const user = await chatroomRepository.getUserPermission(roomId, userId);
      console.log(user)
      const chatroom = await chatroomRepository.getChatroomById(roomId);
      if (!chatroom) throw new Error("Chatroom not found");
      if (chatroom.type!== 'group' || user?.permission !== 'admin') throw new Error("Only group admin can update group name");
      console.log(chatroom.name)
      const updated = await chatroomRepository.updateChatroom(name, roomId);
      if (!updated) throw new Error("Failed to update chatroom");

      return {status: true, data: updated};
    } catch (e) {
      throw new Error("Error in updating chatroom name. Error: " + e);
    }
  }

}

export default new ChatroomService();
