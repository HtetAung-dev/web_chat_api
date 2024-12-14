import { FastifyReply, FastifyRequest } from "fastify";
import { MessageType } from "./types/messageType";
import messageService from "./messageService";

class UserController {
  async getChatroomMessages(
    request: FastifyRequest<{
      Querystring: { roomId: number; limit: number; offset: number };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const roomId: number = request.query.roomId;
    const limit: number = request.query.limit;
    const offset: number = request.query.offset;
    const messages: MessageType[] = await messageService.getChatroomMessage(
      roomId,
      limit,
      offset
    );
    return reply.status(200).send({
      status: true,
      data: messages,
    });
  }
}

export default new UserController();
