import { gql } from 'apollo-server-lambda';
import { Resolvers } from '../graphql-typegen';

export const User = gql`
  type User {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String
    fullName: String!
    avatarUrl: String
    coverPicUrl: String
    isActived: Boolean!
    posts: [Post!]
  }

  type Profile {
    bio: String!
  }

  extend type Query {
    me: User
  }
`;

export const UserResolver: Resolvers = {
  Query: {
    me: async (root, args, ctx) => {
      const users = await ctx.db.user.findMany();
      console.log(users);
      return null;
    },
  },
};
