import { FastifyPluginAsync } from 'fastify';
import cors from '@fastify/cors';
import fp from 'fastify-plugin';
import config from '../config/setting';

const corsPlugin: FastifyPluginAsync = async fastify => {
  fastify.register(cors, {
    origin: "*", // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true,
  });
};

export default fp(corsPlugin, {
  name: 'cors-plugin',
});
