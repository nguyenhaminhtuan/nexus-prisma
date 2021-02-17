import { ApolloServer } from 'apollo-server-lambda';
import depthLimit from 'graphql-depth-limit';
import env from './config/env';
import schema from './schema';
import context from './context';

const server = new ApolloServer({
  schema,
  context,
  introspection: !env.isProd,
  playground: !env.isProd && {
    endpoint: '/dev/graphql',
  },
  uploads: {
    maxFileSize: 10 * 1000 * 1000,
    maxFiles: 10,
  },
  validationRules: [depthLimit(10)],
});

export const graphql = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
