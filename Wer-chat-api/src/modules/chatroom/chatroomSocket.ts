import { Socket } from "socket.io";
import chatroomRepository from "./chatroomRepository";
import { Chatroom } from "./models/chatroom";
import chatroomService from "./chatroomService";
import { ChatroomType } from "./types/chatroomType";


class ChatroomSocket{
    async getAllChatrooms(socket: Socket): Promise<void>{
        const message = await chatroomRepository.getChatroom();
        socket.send(JSON.stringify({ status: true, message: "GETALLCHATROOM", data: message}));
    }

    // async getChatroomByUser(socket: Socket, userId: number): Promise<void> {
    //     const chatrooms = await chatroomService.getChatroomByUser(userId);
    //     socket.send(JSON.stringify({ status: true, message: "GETROOMBYUSER", data: chatrooms }));
    // }

    async createOrGetPrivateChat(socket: Socket, senderId: number, receiverId: number, roomId?:number): Promise<void> {
        const chatroom = await chatroomService.getOrCreatePrivateChat(senderId, receiverId);
        console.log(chatroom)
        if(!chatroom.chatroom_id){
            socket.emit('error', {status: false, message: 'Failed to create or retrieve chatroom'});
            return;
        }

        const chatroomId = chatroom.chatroom_id.toString();

        socket.join(chatroomId);
        socket.to(chatroomId).emit('private-chatroom', {status: true, message: "Chatroom created or retrieved"});
        socket.emit('private-chatroom',{ status: true, message: "chatroom created or retrieved", data: chatroom });
    }


}

export default new ChatroomSocket();