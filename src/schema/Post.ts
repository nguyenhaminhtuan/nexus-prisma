import { gql } from 'apollo-server-lambda';
import { Resolvers } from '../type-generator';

export const Post = gql`
  type Post implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    content: String!
    isPublished: Boolean!
    user: User!
  }

  type PostEdge {
    cursor: String!
    node: Post!
  }

  type PostConnection {
    totalCount: Int!
    edges: [PostEdge!]!
    pageInfo: PageInfo!
  }

  input CreateDraftInput {
    content: String!
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
  Post: {
    user: async (root, args, ctx) => {
      return ctx.loader.getUser.load(root.userId);
    },
  },
  Query: {
    post: async (root, args, ctx) => {
      return ctx.db.post.findUnique({ where: { id: args.postId } });
    },
    posts: async (root, args, ctx) => {
      const count = await ctx.db.post.count();
      await ctx.db.post.findMany({ take: count });
      return null;
    },
  },
  Mutation: {
    createDraft: async (root, { input }, ctx) => {
      return ctx.db.post.create({
        data: {
          ...input,
          userId: ctx.user.sub,
        },
      });
    },
    publishPost: async (root, args, ctx) => {
      return ctx.db.post.update({
        where: { id: args.postId },
        data: { isPublished: true },
      });
    },
  },
};
