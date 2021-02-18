import { gql } from 'apollo-server-lambda';
import { Resolvers } from '../type-generator';

export const User = gql`
  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  type User {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String
    fullName: String!
    avatarUrl: String
    coverPicUrl: String
    isActived: Boolean!
    profile: Profile!
    posts: [Post!]!
    followers: [User!]!
    following: [User!]!
  }

  type Profile {
    bio: String!
    gender: Gender
    birthDay: DateTime
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
