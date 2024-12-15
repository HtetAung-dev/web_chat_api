import { Socket } from "socket.io";
import messageRepository from "./messageRepository";
import { Message } from "./models/message";
import { ContentType } from "./types/contentType";
import messageService from "./messageService";


class MessageSocket{
    async getRoomMessage(socket: Socket, roomId: number): Promise<void>{
        // const message = await messageRepository.getChatroomMessage(roomId)
        // socket.to(roomId).send(JSON.stringify({ status: true, message: "GETROOMMESSAGE", data: message}));
    }

    async sendMessage(socket: Socket, roomId: number, senderId: number, messageContent: string, messageType: ContentType): Promise<void>{
        const message = new Message(roomId, senderId, messageContent, messageType, new Date(), { isPinned: false, isEdited: false, isDeleted: false }, false);
        const newMessage = await messageService.sendMessage(message);
        const room = roomId.toString();

        socket.to(room).emit('new-message', newMessage);
    }


}

export default new MessageSocket();