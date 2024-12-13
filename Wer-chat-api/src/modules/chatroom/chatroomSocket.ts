import { Socket } from "socket.io";
import chatroomRepository from "./chatroomRepository";
import { Chatroom } from "./models/chatroom";
import chatroomService from "./chatroomService";
import { ChatroomType } from "./types/chatroomType";


class MessageSocket{
    async getAllChatrooms(socket: Socket): Promise<void>{
        const message = await chatroomRepository.getChatroom();
        socket.send(JSON.stringify({ status: true, message: "GETALLCHATROOM", data: message}));
    }

    async getChatroomByUser(socket: Socket, userId: number): Promise<void> {
        const chatrooms = await chatroomService.getChatroomByUser(userId);
        socket.send(JSON.stringify({ status: true, message: "GETROOMBYUSER", data: chatrooms }));
    }

    async createChatroom(socket: Socket, chatroomData: ChatroomType, senderId: number, receiverId: number): Promise<void> {
        const chatroom = await chatroomService.createChatroom(chatroomData, senderId, receiverId);
        socket.send(JSON.stringify({ status: true, message: "CREATECHATROOM", data: chatroom }));
    }


}

export default new MessageSocket();