import loMerge from 'lodash/merge';
import { gql, makeExecutableSchema } from 'apollo-server-lambda';
import { Resolvers } from '../type-generator';
import { DateTimeResolver } from 'graphql-scalars';
import { Post, PostResolver } from './Post';
import { User, UserResolver } from './User';

const typeDefs = gql`
  scalar DateTime
  directive @length(max: Int) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

  type Query {
    ok: Boolean!
  }

  type Mutation {
    ok: Boolean!
  }

  type PageInfo {
    endCursor: String!
    hasNextPage: Boolean!
  }

  interface Edge {
    cursor: String!
  }

  interface Connection {
    totalCount: Int!
    pageInfo: PageInfo!
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
