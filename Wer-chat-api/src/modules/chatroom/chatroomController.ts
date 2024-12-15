import { FastifyReply, FastifyRequest } from "fastify";
import chatroomService from "./chatroomService";
class ChatroomController {
  async getUserChatroom(
    request: FastifyRequest<{
      Querystring: { userId: number; limit: number; page: number };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId: number = request.query.userId;
    const limit: number = request.query.limit;
    const page: number = request.query.page;
    const chatrooms: any= await chatroomService.getChatroomByUser(
      userId,
      limit,
      page
    );
    return reply.status(200).send({
      status: true,
      data: chatrooms,
    });
  }
}

export default new ChatroomController();
