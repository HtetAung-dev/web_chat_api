import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  RawServerDefault,
} from "fastify";
import registerRoutes from "./modules/router";
import fastifyJwt from "@fastify/jwt";
import dbClient from "./plugins/dbClient";
import firebaseAdminPlugin from "./plugins/firebaseAdminPlugin";
import authPlugin from "./plugins/authPlugin";
import corsPlugin from "./plugins/corsPlugin";
import config from "./config/setting";
import socketPlugin from "./plugins/socketPlugin";
import socketGateway from "./socket.gateway";
import fastifyMultipart from "@fastify/multipart";

const fastify: FastifyInstance = Fastify({
  logger: false,
});

fastify.register(corsPlugin);
fastify.register(fastifyMultipart, {attachFieldsToBody: true});
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "your-secret-key",
});
fastify.register(dbClient);

fastify.register(registerRoutes);
fastify.register(firebaseAdminPlugin);
fastify.register(socketGateway);


const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: 3031, host: "0.0.0.0" });
    fastify.log.info(`Server is listening on http://localhost:3031`);
    console.log(`Server is listening on http://localhost:3031`);
    console.log(`${config.docker.managedDb.postgreSql.databaseUrl} is running with user ${config.docker.managedDb.postgreSql.user}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

fastify.ready((err) => {
  if(err){
    console.error(err)
    process.exit(1)
  }
  console.log('Socket.Io is ready')
})

start();
