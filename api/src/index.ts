/**
 * This is required at the top level because it is used by `type-graphql`
 * and the generated resolvers.
 *
 * ref https://typegraphql.com/docs/installation.html
 */
import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { koaMiddleware } from '@as-integrations/koa';
import cors from '@koa/cors';
import { type PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import http from 'node:http';
import { buildSchema } from 'type-graphql';
import { resolvers } from '../prisma/generated/type-graphql/index.js';
import { client } from './client.js';

dotenv.config();

interface Context {
  client: PrismaClient;
}

const IF_DEV_MODE = process.env['NODE_ENV'] !== 'production';

const schema = await buildSchema({
  resolvers,
  emitSchemaFile: './src/prisma/generated/schema.graphql',
  validate: false,
});

const app = new Koa();
const httpServer = http.createServer(app.callback());
const server = new ApolloServer<Context>({
  cache: new InMemoryLRUCache(),
  schema,
  introspection: IF_DEV_MODE,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginUsageReportingDisabled()],
});

await server.start();

app.use(
  cors({
    origin: process.env['CORS_ORIGIN'],
  })
);
app.use(bodyParser());
app.use(
  koaMiddleware<Context>(server, {
    context: async () => ({ client }),
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port: process.env['DEV_PORT'] }, resolve));
