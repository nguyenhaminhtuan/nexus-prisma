import loMerge from 'lodash/merge';
import { gql, makeExecutableSchema } from 'apollo-server-lambda';
import { Prisma } from '@prisma/client';
import { Resolvers } from '../type-generator';
import { DateTimeResolver } from 'graphql-scalars';
import { Post, PostResolver } from './Post';
import { User, UserResolver } from './User';
import { Topic, TopicResolver } from './Topic';

const typeDefs = gql`
  scalar DateTime

  type Query {
    ok: Boolean!
  }

  type Mutation {
    ok: Boolean!
  }

  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  enum SortOrder {
    ASC
    DESC
  }
`;

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    ok: () => true,
  },
  Mutation: {
    ok: () => true,
  },
  SortOrder: {
    ASC: Prisma.SortOrder.asc,
    DESC: Prisma.SortOrder.desc,
  },
};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, User, Post, Topic],
  resolvers: loMerge(resolvers, UserResolver, PostResolver, TopicResolver),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

export default schema;
