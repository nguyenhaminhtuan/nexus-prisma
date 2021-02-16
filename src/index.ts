import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import expressJwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';
import env from './config/env';
import logger from './utils/logger';
import context from './context';
import schema from './schema';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(
  expressJwt({
    secret: env.jwtSecret,
    credentialsRequired: false,
    algorithms: ['RS256', 'HS256'],
  })
);

const server = new ApolloServer({
  schema,
  context,
  logger,
  uploads: {
    maxFileSize: 10 * 1000 * 1000, // 10MB
    maxFiles: 5,
  },
});

server.applyMiddleware({ app });

app.listen(env.app.port, () =>
  logger.info(`Server ready at port ${env.app.port}`)
);
