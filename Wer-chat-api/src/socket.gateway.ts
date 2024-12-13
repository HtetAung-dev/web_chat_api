// features/chat/chat.gateway.ts
import { FastifyPluginCallback } from 'fastify';
import { Server } from 'socket.io';
import chatroomSocket from './modules/chatroom/chatroomSocket';
import { Chatroom } from './modules/chatroom/models/chatroom';
// import { chatrooms, chatroomUsers, messages, db } from '../../models';

const socketGateway: FastifyPluginCallback = (fastify, opts, done) => {
  const io = new Server(fastify.server);
  io.on('connection', (socket) => {
    socket.send("connected") 

    socket.on('greeting', async (callback) =>{
      console.log(`Greeting socket`);
      socket.emit("message",{"text": "Helloworld!"});
    })

    socket.on('get-chatroom', async({ userId }, callback) => {
        try {
            
        } catch (error) {
            
        }
    });
    // Create room
    socket.on('create-private-room', async ({ name, senderId, memberId }, callback) => {
      try {
        const chatroom: Chatroom = {
          name : name,
          type : 'private',
          createdAt : new Date(),
          updatedAt : new Date()
        }
        const result = await chatroomSocket.createChatroom(socket, chatroom, senderId, memberId);
      } catch (error) {
        console.log(error);
        throw Error();
      }
    });



    // Send message
    socket.on('send-message', async ({ chatroomId, senderId, type, content }, callback) => {
    //   try {
    //     const [message] = await db.insert(messages).values({ chatroomId, senderId, type, content }).returning();
    //     io.to(chatroomId).emit('new-message', message);
    //     callback({ success: true });
    //   } catch (err) {
    //     fastify.log.error('Error sending message:', err);
    //     callback({ success: false, error: 'Failed to send message' });
    //   }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  done();
};

export default socketGateway;
