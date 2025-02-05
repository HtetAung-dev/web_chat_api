import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../config/chat.dev.env") });

const config = {
  digitalOcean: {
    managedDb: {
      postgreSql: {
        databaseUrl: process.env.POSTGRES_URL,
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT,
        sslMode: process.env.DIGITAL_OCEAN_POSTGRES_SSLMODE,
      },
      // postgreSql: {
      //   databaseUrl: process.env.DIGITAL_OCEAN_POSTGRES_DATABASE_URL,
      //   host: process.env.DIGITAL_OCEAN_POSTGRES_HOST,
      //   user: process.env.DIGITAL_OCEAN_POSTGRES_USER,
      //   password: process.env.DIGITAL_OCEAN_POSTGRES_PASSWORD,
      //   database: process.env.DIGITAL_OCEAN_POSTGRES_DATABASE,
      //   port: process.env.DIGITAL_OCEAN_POSTGRES_PORT,
      //   sslMode: process.env.DIGITAL_OCEAN_POSTGRES_SSLMODE,
      // },
    },
    spacesObjectStorage: {
      endpoint: process.env.DIGITAL_OCEAN_SPACES_OBJECT_STORAGE_ENDPOINT,
      cdnEndpoint: process.env.DIGITAL_OCEAN_SPACES_OBJECT_STORAGE_CDN_ENDPOINT,
      accessKey: process.env.DIGITAL_OCEAN_SPACES_OBJECT_STORAGE_ACCESS_KEY,
      secretKey: process.env.DIGITAL_OCEAN_SPACES_OBJECT_STORAGE_SECRET_KEY,
      spaceName: process.env.DIGITAL_OCEAN_SPACES_OBJECT_STORAGE_SPACE_NAME,
      region: process.env.DIGITAL_OCEAN_SPACES_OBJECT_STORAGE_REGION,
    },
  },
  docker: {
    managedDb: {
      postgreSql: {
        databaseUrl: process.env.POSTGRES_URL,
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT,
        sslMode: process.env.DIGITAL_OCEAN_POSTGRES_SSLMODE,
      },
    }
  },
  //   googleCloudPlatform: {
  //     placeEndpoint: process.env.GOOGLE_PLACE_API_ENDPOINT,
  //     mapEndpoint: process.env.GOOGLE_MAP_API_ENDPOINT,
  //     nearbyMask: process.env.GOOGLE_NEARBY_MASK,
  //     searchPlaceMask: process.env.GOOGLE_SEARCH_PLACE_MASK,
  //     placesAPIKey: process.env.GOOGLE_CLOUD_PLATFORM_PLACES_API_KEY,
  //   },
  //   perplexity: {
  //     apiKey: process.env.PERPLEXITY_API_KEY,
  //   },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    cookieSecret: process.env.JWT_COOKIE_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
  //   stripe: {
  //     secret: process.env.STRIPE_SECRET_KEY,
  //     timeout: process.env.STRIPE_TIME_OUT,
  //   },
  mode: {
    isProduction: process.env.IS_PRODUCTION,
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID,
  },
  cors: {
    domain: {
      ui: process.env.LOCAL_CORS_UI_DOMAIN,
    },
  },
};

export default config;
