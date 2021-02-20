import { gql } from 'apollo-server-lambda';
import { Resolvers } from '../type-generator';

export const Topic = gql`
  type Topic implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    isActived: Boolean!
    parent: Topic
    children: [Topic!]!
    childrenCount: Int!
    followerCount: Int!
    posts(limit: Int = 10): [Post!]
  }

  input CreateTopicInput {
    name: String!
  }

  input CreateSubTopicInput {
    name: String!
    parentId: String!
  }

  input UpdateTopicInput {
    name: String!
    isActived: Boolean!
  }

  extend type Query {
    topic(topicId: String!): Topic
    topics(limit: Int = 10): [Topic!]
    topicByName(name: String!): Topic
  }

  extend type Mutation {
    createTopic(input: CreateTopicInput!): Topic
    createSubTopic(input: CreateSubTopicInput!): Topic
    updateTopic(topicId: String!, input: UpdateTopicInput!): Topic
    deleteTopic(topicId: String!): Topic
    followTopic(topicId: String!): Topic
    unfollowTopic(topicId: String!): Topic
  }
`;

export const TopicResolver: Resolvers = {
  Topic: {},
  Query: {
    topic: (root, args, ctx) => {
      return ctx.db.topic.findUnique({ where: { id: args.topicId } });
    },
    topics: (root, args, ctx) => {
      return ctx.db.topic.findMany({ take: args.limit });
    },
    topicByName: (root, args, ctx) => {
      return ctx.db.topic.findUnique({ where: { name: args.name } });
    },
  },
  Mutation: {
    createTopic: (root, args, ctx) => {
      return ctx.db.topic.create({ data: { ...args.input } });
    },
    createSubTopic: (root, args, ctx) => {
      return ctx.db.topic.create({ data: { ...args.input } });
    },
    updateTopic: (root, args, ctx) => {
      return ctx.db.topic.update({
        where: { id: args.topicId },
        data: { ...args.input },
      });
    },
    deleteTopic: (root, args, ctx) => {
      return ctx.db.topic.delete({ where: { id: args.topicId } });
    },
    followTopic: (root, args, ctx) => {
      return ctx.db.topic.update({
        where: { id: args.topicId },
        data: {
          followers: {
            connect: { id: ctx.user.sub },
          },
        },
      });
    },
    unfollowTopic: (root, args, ctx) => {
      return ctx.db.topic.update({
        where: { id: args.topicId },
        data: {
          followers: {
            disconnect: {
              id: ctx.user.sub,
            },
          },
        },
      });
    },
  },
};
