import { Socket } from "socket.io";
import messageRepository from "./messageRepository";
import { Message } from "./models/message";


class MessageSocket{
    async getAllMessage(socket: Socket, roomId: number): Promise<void>{
        const message = await messageRepository.getChatroomMessage(roomId)
        socket.send(JSON.stringify({ status: true, message: "GETROOMMESSAGE", data: message}));
    }


}

export default new MessageSocket();