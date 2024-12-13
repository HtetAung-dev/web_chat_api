// plugins/socket.ts
import { Server, Socket } from 'socket.io';
import { FastifyPluginCallback } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}

const socketPlugin: FastifyPluginCallback = (fastify, opts, done) => {
  const io = new Server(fastify.server, {
    cors: {
      origin: '*', // Replace with your frontend's URL
      methods: ['GET', 'POST'],
    },
  });

  fastify.decorate('io', io);

  done();
};

export default socketPlugin;
