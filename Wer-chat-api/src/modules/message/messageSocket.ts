import { Socket } from "socket.io";
import messageRepository from "./messageRepository";
import { Message } from "./models/message";
import { ContentType } from "./types/contentType";
import messageService from "./messageService";


class MessageSocket{
    async sendMessage(socket: Socket, roomId: number, senderId: number, messageContent: string, messageType: ContentType): Promise<void>{
        const message = new Message(roomId, senderId, messageContent, messageType, new Date(), false, new Date(), false, false, false);
        const response = await messageService.sendMessage(message);
        const room = roomId.toString();

        socket.to(room).emit('new-message', response);
        socket.emit('new-message', response);
    }

    async readMessage(socket: Socket, messageId: number){
        const response = await messageService.readMessage(messageId);
        if(!response.status){
            socket.emit('error', {status: false, message: 'Failed to read message'});
            return;
        }
        const room = response.data.room_id.toString();
        socket.to(room).emit('message-read', response.data);
    }
}

export default new MessageSocket();