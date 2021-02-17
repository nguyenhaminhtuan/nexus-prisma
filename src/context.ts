import lambda from 'aws-lambda';
import dataloader from './dataloader';
import db from './db';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import util from 'util';
import { AuthenticationError } from 'apollo-server-lambda';
import env from './config/env';

interface FunctionParams {
  event: lambda.APIGatewayProxyEvent;
  context: lambda.Context;
}
export interface Context {
  event: lambda.APIGatewayProxyEvent;
  context: lambda.Context;
  db: typeof db;
  dataloader: typeof dataloader;
  user: any;
}

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  jwksUri: `${env.auth.issuer}.well-known/jwks.json`,
});

const context = async ({ event, context }: FunctionParams) => {
  let user: any = null;
  const authHeader = event.headers.authorization;

  if (authHeader) {
    const match = authHeader.match(/^Bearer (.*)$/);

    if (!match || match.length < 2) {
      throw new AuthenticationError('Invalid token type');
    }

    const token = match[1];
    const decoded = jwt.decode(token, { complete: true }) as any;

    if (!decoded || !decoded.header || !decoded.header.kid) {
      throw new AuthenticationError('Invalid token');
    }

    const getSigningKey = util.promisify(client.getSigningKey);
    const signingKey = await getSigningKey(decoded.header.kid);
    const publicKey = signingKey.getPublicKey();

    const payload = jwt.verify(token, publicKey, {
      audience: env.auth.audience,
      issuer: env.auth.issuer,
      algorithms: ['RS256'],
    }) as any;

    user = payload;
  }

  return { event, context, db, dataloader, user };
};

export default context;
