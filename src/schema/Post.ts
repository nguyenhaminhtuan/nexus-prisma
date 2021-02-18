import { gql } from 'apollo-server-lambda';
import { Resolvers } from '../type-generator';

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

  input CreateDraftInput {
    title: String
    content: String
  }

  extend type Query {
    post(postId: String!): Post
    posts(first: Int = 10, last: String): PostConnection
  }

  extend type Mutation {
    createDraft(input: CreateDraftInput!): Post
    publishPost(postId: String!): Post
    updatePost(postId: String!): Post
    deletePost(postId: String!): Boolean
  }
`;

export const PostResolver: Resolvers = {
  Query: {
    post: () => {
      return null;
    },
  },
};
