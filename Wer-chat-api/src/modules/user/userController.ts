import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "./userService";
import { User } from "./models/user";

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
