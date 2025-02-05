import config from './src/config/setting';
import {defineConfig} from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: config.docker.managedDb.postgreSql.databaseUrl as string,
        host: config.docker.managedDb.postgreSql.host as string,
        port: parseInt(config.docker.managedDb.postgreSql.port as string, 10),
        user: config.docker.managedDb.postgreSql.user,
        password: config.docker.managedDb.postgreSql.password,
        database: config.docker.managedDb.postgreSql.database,
        ssl: false
      },
      verbose: true,
      strict: true
});