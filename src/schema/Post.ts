import { gql } from 'apollo-server-lambda';
import { Resolvers } from '../graphql-typegen';

export const Post = gql`
  type Post {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    content: String!
  }

  type PostEdge implements Edge {
    cursor: String!
    node: Post!
  }

  type PostConnection implements Connection {
    totalCount: Int!
    edges: [PostEdge!]!
    pageInfo: PageInfo!
  }

  extend type Query {
    post(postId: String!): Post
    posts(first: Int = 10, last: String): PostConnection
  }
`;

export const PostResolver: Resolvers = {
  Query: {
    post: () => {
      return null;
    },
  },
};
