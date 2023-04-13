/**
 * This is required at the top level because it is used by `type-graphql` and the generated resolvers.
 *
 * @link https://typegraphql.com/docs/installation.html
 */
import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { koaMiddleware } from '@as-integrations/koa';
import cors from '@koa/cors';
import { PrismaClient } from '@prisma/client';
import { resolvers } from '@prisma/generated/type-graphql/index.js';
import dotenv from 'dotenv';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import http from 'node:http';
import { buildSchema } from 'type-graphql';
import { IS_DEV_MODE } from './constants/env-mode.js';

dotenv.config();

const CORS_ORIGINS = process.env['CORS_ORIGIN'];

interface Context {
  prisma: PrismaClient;
}

const prisma = new PrismaClient();
await prisma.$connect();

const schema = await buildSchema({
  resolvers,
  emitSchemaFile: './prisma/schema.graphql',
  validate: false,
});

const app = new Koa();
const httpServer = http.createServer(app.callback());
const server = new ApolloServer<Context>({
  cache: new InMemoryLRUCache(),
  schema,
  introspection: IS_DEV_MODE,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer }) /*, ApolloServerPluginUsageReportingDisabled()*/],
  formatError(formattedError, error) {
    console.log((error as any).extensions.http.headers); // { status: 400, headers: HeaderMap(0) [Map] {} }
    console.log(error);

    return formattedError;
  },
});

await server.start();

app.use(
  cors({
    allowMethods: ['POST', 'OPTIONS'],
    origin: 'https://localhost:8000',
  })
);
app.use(bodyParser());
app.use(
  koaMiddleware<Context>(server, {
    context: async () => ({ prisma }),
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port: 8008 }, resolve));
