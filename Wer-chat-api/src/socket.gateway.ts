// features/chat/chat.gateway.ts
import { FastifyPluginCallback } from 'fastify';
import { Server, Socket } from 'socket.io';
import messageSocket from './modules/message/messageSocket';
import chatroomSocket from './modules/chatroom/chatroomSocket';
import 'socket.io'

declare module 'socket.io' {
  interface Socket {
    userId?: number;
  }
}

const socketGateway: FastifyPluginCallback = (fastify, opts, done) => {
  const io = new Server(fastify.server);
  const socketToUserMap: Map<string, number> = new Map();
  let usersInRooms: { [roomId: string]: Set<string> } = {};
  // authenticate sockets 
  const authenticateSocket = (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.query.token;

    if (!token) {
      return next(new Error('Authentication error: No token provided.'));
    }

    fastify.jwt.verify(token as string, (err, decoded) => {
      if (err) {
        console.log('Authentication error', err.message)
        return {status: 401, message: err.message};
      }
      console.log(decoded)
      socket.userId = decoded.id; // Attach the decoded userId to the socket
      next();
    });
  };

  io.use(authenticateSocket);

  io.on('connection', (socket) => {
    socket.send("connected")
    socket.on('register', ({}) => {
      const userId = socket.userId!;
      socketToUserMap.set(socket.id, userId); // Map socket ID to user ID
      console.log(`User ${userId} connected with socket ID ${socket.id}.`);
    });



    socket.on('greeting', async (callback) => {
      console.log(`Greeting socket`);
      socket.emit("message", { "text": "Helloworld!" });
    })
    // joined rooms
    socket.on('subscribe-rooms', async ({ roomId }, callback) => {
      if (!roomId) {
        socket.emit('error', { status: false, message: "failed to join" })
      }
      console.log(roomId);
      const room = roomId.toString();
      socket.join(room);
      socket.emit('connect-message', { status: true, "message": "user joined the room" });
    })

    // Create room
    socket.on('create-room', async ({members, isPrivate, groupName }, callback) => {
      const userId = socket.userId!;
      console.log(userId)
      try {
        if (isPrivate) {
          const result = await chatroomSocket.createOrGetPrivateChat(socket, userId, members);
        } else {
          await chatroomSocket.createGroupChat(socket, groupName, userId, members);
        }
      } catch (error) {
        console.log(error);
        throw Error();
      }
    });

    socket.on('change-groupname', async ({ roomId, name }, callback) => {
      const userId = socket.userId!;
      try {
        await chatroomSocket.updateGroupName(socket, roomId, name, userId);
      } catch (error) {
        console.log(error);
        throw Error();
      }
    })

    // Send message
    socket.on('send-message', async ({ chatroomId, type, content }, callback) => {
      const userId = socket.userId!;
      try {
        const message = await messageSocket.sendMessage(socket, chatroomId, userId, content, type);

      } catch (err) {
        fastify.log.error('Error sending message:', err);
      }
    });

    // read message
    socket.on('read-message', async ({ messageId }, callback) => {
      try {
        await messageSocket.readMessage(socket, messageId);
      } catch (error) {
        fastify.log.error('Error reading message:', error);
      }
    })

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  done();
};

export default socketGateway;
