import loMerge from 'lodash/merge';
import { gql, makeExecutableSchema } from 'apollo-server-lambda';
import { Resolvers } from '../graphql-typegen';
import { DateTimeResolver } from 'graphql-scalars';
import { LengthDirective } from '../directives/LengthDirective';
import { Post, PostResolver } from './Post';
import { User, UserResolver } from './User';

const typeDefs = gql`
  scalar DateTime
  directive @length(max: Int) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

  type Query {
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
};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, User, Post],
  resolvers: loMerge(resolvers, UserResolver, PostResolver),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  schemaDirectives: {
    length: LengthDirective,
  },
});

export default schema;
