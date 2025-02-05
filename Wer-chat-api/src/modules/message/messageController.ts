import { FastifyReply, FastifyRequest } from "fastify";
import { MessageType } from "./types/messageType";
import messageService from "./messageService";

class UserController {
  async getChatroomMessages(
    request: FastifyRequest<{
      Querystring: { roomId: number; limit: number; page: number };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const roomId: number = request.query.roomId;
    const limit: number = request.query.limit;
    const page: number = request.query.page;
    const messages: MessageType[] = await messageService.getChatroomMessage(
      roomId,
      limit,
      page
    );
    return reply.status(200).send({
      status: true,
      data: messages,
    });
  }
}

export default new UserController();
