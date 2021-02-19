import loMerge from 'lodash/merge';
import { gql, makeExecutableSchema } from 'apollo-server-lambda';
import { Resolvers } from '../type-generator';
import { DateTimeResolver } from 'graphql-scalars';
import { Post, PostResolver } from './Post';
import { User, UserResolver } from './User';

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

  enum SortDirection {
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
};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, User, Post],
  resolvers: loMerge(resolvers, UserResolver, PostResolver),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

export default schema;
