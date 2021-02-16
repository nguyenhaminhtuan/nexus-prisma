import {
  ApolloServerExpressConfig,
  ExpressContext,
} from 'apollo-server-express';
import dataloader from './dataloader';
import db from './db';

type ContextFunctionType = ApolloServerExpressConfig['context'];

export interface Context extends ExpressContext {
  db: typeof db;
  dataloader: typeof dataloader;
  req: ExpressContext['req'] & {
    user: {
      sub: string;
    };
  };
}

const context: ContextFunctionType = ({ req, res }) => {
  return { req, res, db, dataloader };
};

export default context;
