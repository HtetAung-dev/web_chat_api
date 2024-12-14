import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "./userService";
import { User } from "./models/user";
import userService from "./userService";

class UserController {
  async getUsers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user: User[] = await UserService.getUsers();
    // return reply
    // .status(404)
    // .send({ status: false, error: "Internal Server Error Zzzzzzzzzzz" });

    reply.status(200).send({
      status: true,
      users: user,
    });
  }

  async getUserById(req: FastifyRequest<{Params: {id: number}}>, reply: FastifyReply): Promise<void>{
    try {
      const {id} = req.params;
      console.log(id)
      const userDetail = await userService.getUserById(id);
      if (!userDetail) {
        return reply.status(404).send({ status: false, error: "User not found" });
      }
      return reply.status(200).send({status: true, data: userDetail});
    } catch (error) {
      console.log(`Error: ${error}`);
      return reply.status(500).send({status: false, error: "Failed to retrieve user detail!"});
    }
  }
  async createUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const user = req.body as User; // Construct a `User` model from request body
      const createdUser = await UserService.createUser(user);
      reply.status(201).send(createdUser); // Respond with the created user
    } catch (error) {
      console.error("Error in UserController.createUser:", error);
      reply.status(500).send({ error: "Failed to create user" });
    }
  }
}

export default new UserController();
