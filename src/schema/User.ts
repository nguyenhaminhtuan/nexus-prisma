import { gql } from 'apollo-server-lambda';
import { Resolvers } from '../type-generator';

export const User = gql`
  enum UserStatus {
    enabled
    disabled
  }

  enum Gender {
    male
    female
    other
  }

  type User implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String
    fullName: String!
    avatarUrl: String
    status: UserStatus!
    profile: Profile!
    posts: [Post!]
    followers: [User!]!
    following: [User!]!
  }

  type Profile {
    bio: String!
    gender: Gender
    birthDay: DateTime
    phone: String
  }

  extend type Query {
    me: User
  }
`;

export const UserResolver: Resolvers = {
  User: {
    posts: async (root, args, ctx) => {
      const user = await ctx.db.user.findUnique({
        where: { id: root.id },
        include: { posts: true },
      });
      if (!user) return null;
      // const posts = await ctx.loader.getPostsByUser.load({
      //   id: root.id,
      //   take: 10,
      // });
      return user.posts;
    },
  },
  Query: {
    me: async (root, args, ctx) => {
      return ctx.db.user.findUnique({
        where: { id: ctx.user.sub },
        include: { profile: true },
      });
    },
  },
};
