import { Socket } from "socket.io";
import chatroomRepository from "./chatroomRepository";
import { Chatroom } from "./models/chatroom";
import chatroomService from "./chatroomService";
import { ChatroomType } from "./types/chatroomType";
import userService from "../user/userService";


class ChatroomSocket{
    async getAllChatrooms(socket: Socket): Promise<void>{
        const message = await chatroomRepository.getChatroom();
        socket.send(JSON.stringify({ status: true, message: "GETALLCHATROOM", data: message}));
    }

    async createOrGetPrivateChat(socket: Socket, senderId: number, members: number[], roomId?:number): Promise<void> {
        const chatroomResponse = await chatroomService.getOrCreatePrivateChat(senderId, members[0]);
        console.log(chatroomResponse)
        if(!chatroomResponse.status){
            socket.emit('error', {status: false, message: 'Failed to create or retrieve chatroom'});
            return;
        }

        const chatroomId = chatroomResponse.chatroom.chatroom_id.toString();

        socket.join(chatroomId);
        socket.to(chatroomId).emit('joined-room', chatroomResponse);
        socket.emit('joined-room',chatroomResponse);
    }

    async createGroupChat(socket: Socket, name: string, creator: number, member: []): Promise<void> {
        const newGroupChat = await chatroomService.CreateGroupChat(name, creator, member);
        if(!newGroupChat.status) {
            socket.emit('error', {status: false, message: 'Could not create group chat'});
        }
        const roomId = newGroupChat.chatroom.chatroom_id.toString();
        socket.join(roomId);
        socket.to(roomId).emit('joined-room', newGroupChat);
        socket.emit('joined-room', newGroupChat);
    }

    async updateGroupName(socket: Socket, roomId: number, name: string, userId: number): Promise<void> {
        const response = await chatroomService.updateGroupName(roomId, name, userId);

        if(!response.status) {
            socket.emit('error', {status: false, message: 'Could not update group name'});
            return;
        }
        socket.to(response.data.id.toString()).emit('updated-groupname', response);
        socket.emit('updated-groupname', response);
        
    }


}

export default new ChatroomSocket();