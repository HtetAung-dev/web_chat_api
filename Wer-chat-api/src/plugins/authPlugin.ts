import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";

const authPlugin: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  options
) => {
  fastify.addHook("onRequest", async (request, reply) => {
    const excludedRoutes = ["/auth/login", "/auth/refresh-token", "/docs"];
    const currentPath = request.raw.url!?.split("?")[0];

    if (
      excludedRoutes.includes(currentPath) ||
      currentPath.startsWith("/docs/")
    ) {
      return;
    }

    try {
      await request.jwtVerify();
    } catch (err) {
      console.log("\n\nJWT verification failed: ", err, "\n\n");
      reply.status(401).send({ message: "Unauthorized" });
    }
  });
};

export default fp(authPlugin, {
  name: "auth-plugin",
});
