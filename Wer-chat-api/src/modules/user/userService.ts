import UserRepository from "./userRepository";
import { UserType } from "./types/userType";
import { User } from "./models/user";
import { FastifyReply } from "fastify";

class UserService {
  async getUsers(): Promise<User[]> {
    try {
      const users: UserType[] = await UserRepository.getUsers();
      return users.map(User.fromUserType);
    } catch (e) {
      throw new Error("Error in getting users. Error: " + e);
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const newUser: UserType = await UserRepository.createUser(user);
      return User.fromUserType(newUser);
    } catch (e) {
      throw new Error("Error in creating user. Error: " + e);
    }
  }
}

export default new UserService();
