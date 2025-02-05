import UserRepository from "./userRepository";
import { UserType } from "./types/userType";
import { User } from "./models/user";
import { FastifyReply } from "fastify";
import path from "path";
import fs from "fs";

class UserService {
  async getUsers(): Promise<User[]> {
    try {
      const users: UserType[] = await UserRepository.getUsers();
      return users.map(User.fromUserType);
    } catch (e) {
      throw new Error("Error in getting users. Error: " + e);
    }
  }

  async getUserById(id: number): Promise<User>{
    try {
      const user : UserType | null = await UserRepository.getUserById(id);
      if(user){
        return User.fromUserType(user);
      } else {
        throw new Error("User not found");
      }
      
    } catch (error) {
      throw new Error("Error in getting user. Error: " + error);
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

  async updateUser(id: number, name: string, profile_picture: any) : Promise<User> {
    try {

      let profilePictureUrl: string = '' ;
      if(profile_picture.file){
        const uploadDir = path.join(__dirname, "uploads"); // Define upload directory
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir); // Ensure directory exists
        const filename = new Date().toISOString()+profile_picture.filename;
        profilePictureUrl = path.join(uploadDir, filename); // Define file path
        const buffer = await profile_picture.toBuffer(); // Get file as buffer
        fs.writeFileSync(profilePictureUrl, buffer); // Save file
      }

      console.log(profilePictureUrl)
      const updatedUser: any = await UserRepository.updateUser(id, name, profilePictureUrl);
      console.log('updateData', updatedUser); //
      if(updatedUser){
        return User.fromUserType(updatedUser);
      } else {
        throw new Error("User not found");
      }
      
    } catch (error) {
      throw new Error("Error in updating user. Error: " + error);
    }
  }
}

export default new UserService();
