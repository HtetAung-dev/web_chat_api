// features/chat/chat.gateway.ts
import { FastifyPluginCallback } from 'fastify';
import { Server, Socket } from 'socket.io';
import messageSocket from './modules/message/messageSocket';
import chatroomSocket from './modules/chatroom/chatroomSocket';
// import { chatrooms, chatroomUsers, messages, db } from '../../models';

const socketGateway: FastifyPluginCallback = (fastify, opts, done) => {
  const io = new Server(fastify.server);
  const socketToUserMap: Map<string, number> = new Map();
  io.on('connection', (socket) => {
    socket.send("connected")
    socket.on('register', ({ userId }) => {
      (socket as any).userId = userId; // Attach the userId to the socket
      socketToUserMap.set(socket.id, userId); // Map socket ID to user ID
      console.log(`User ${userId} connected with socket ID ${socket.id}.`);
    });



    socket.on('greeting', async (callback) => {
      console.log(`Greeting socket`);
      socket.emit("message", { "text": "Helloworld!" });
    })

    socket.on('join-room', async ({ roomId }, callback) => {
      if (!roomId) {
        socket.emit('error', { status: false, message: "failed to join" })
      }
      console.log(roomId);
      const room = roomId.toString();
      socket.join(room);
      socket.emit('connect-message', { status: true, "message": "user joined the room" });
    })

    socket.on('get-chatroom', async ({ userId }, callback) => {
      try {

      } catch (error) {

      }
    });
    // Create room
    socket.on('create-private-room', async ({ senderId, memberId }, callback) => {
      try {
        const result = await chatroomSocket.createOrGetPrivateChat(socket, senderId, memberId);
      } catch (error) {
        console.log(error);
        throw Error();
      }
    });

    socket.on('create-groupchat', async ({ name, creator, members }, callback) => {
      try {
        await chatroomSocket.createGroupChat(socket, name, creator, members);
      } catch (error) {
        fastify.log.error(error);
      }
    })

    // Send message
    socket.on('send-message', async ({ chatroomId, senderId, type, content }, callback) => {
      try {
        const message = await messageSocket.sendMessage(socket, chatroomId, senderId, content, type);

      } catch (err) {
        fastify.log.error('Error sending message:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  done();
};

export default socketGateway;
