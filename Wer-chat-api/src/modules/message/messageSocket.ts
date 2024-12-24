import { Socket } from "socket.io";
import messageRepository from "./messageRepository";
import { Message } from "./models/message";
import { ContentType } from "./types/contentType";
import messageService from "./messageService";


class MessageSocket{
    async sendMessage(socket: Socket, roomId: number, senderId: number, messageContent: string, messageType: ContentType): Promise<void>{
        const message = new Message(roomId, senderId, messageContent, messageType, new Date(), false, new Date(), false, false, false);
        console.log(message)
        const response = await messageService.sendMessage(message);
        if(!response.status){
            socket.emit("error", response);
        }
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
        const room = response.data?.room_id.toString();
        socket.to(room!).emit('message-read', response.data);
    }

    async editMessage(socket: Socket, messageId: number, message: string) {
        const response = await messageService.editMessage(messageId, message);
        console.log("get message is response", response);
        if (!response.status) {
          socket.emit("error", {
            status: false,
            message: "Failed to edit message",
          });
          return;
        }
        const room = response.data?.room_id.toString();
        socket.to(room!).emit("edit-message", response.data);
        socket.emit("edit-message", response);
    }

    async getCallData(socket: Socket, roomId: number){
        const response = await messageService.getCallData(roomId);
        if(!response?.status){
            socket.emit('error', response);
            return;
        }
        socket.to(roomId.toString()).emit('incoming-call', response);
      }
      
}

export default new MessageSocket();