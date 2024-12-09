import fp from "fastify-plugin";
import admin from "firebase-admin";
import config from "../config/setting";
import { Auth } from "firebase-admin/lib/auth";
import path from "path";

// Extend FastifyInstance locally
declare module "fastify" {
  interface FastifyInstance {
    firebaseAuth: Auth;
  }
}

/**
 * A Fastify plugin to initialize Firebase Admin SDK for each request.
 */
async function firebaseAdminPlugin(fastify: any, options: any) {
  // Initialize Firebase Admin SDK
  // const firebaseConfig = {
  //   apiKey: config.firebase.apiKey,
  //   authDomain: config.firebase.authDomain,
  //   projectId: config.firebase.projectId,
  //   appId: config.firebase.appId,
  // };
  // admin.initializeApp(firebaseConfig);

  // fastify.decorate("firebaseAuth", {
  //   getter: () => admin.auth(),
  // }); // Add firebaseAuth to the request object

  const serviceAccount = path.resolve(__dirname, "../../firebase-key/key.json");

  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("Firebase Admin initialized successfully.");

    // Optionally, check if Firebase Admin is connected by performing a test call
    try {
      await admin.auth().listUsers(1); // Fetch one user as a test
      console.log("Firebase Admin SDK connection test successful.");
    } catch (error) {
      console.error("Error testing Firebase connection:", error);
    }
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
  }

  fastify.decorate("firebaseAuth", {
    getter: () => admin.auth(),
  });

  fastify.addHook("onClose", (instance: any, done: any) => {
    if (admin.apps.length) {
      admin
        .app()
        .delete()
        .then(() => done());
    } else {
      done();
    }
  });
}

export default fp(firebaseAdminPlugin);
