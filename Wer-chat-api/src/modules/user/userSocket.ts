import { Socket } from "socket.io";
import userRepository from "./userRepository";
import { User } from "./models/user";


class UserSocket{
    async getAllUsers(socket: Socket): Promise<void>{
        const user = await userRepository.getUsers();
        socket.send(JSON.stringify({ status: true, message: "GETROOMMESSAGE", data: user}));
    }
}

export default new UserSocket();