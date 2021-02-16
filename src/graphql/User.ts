import { enumType, extendType, objectType, stringArg } from 'nexus';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env';

export const UserRole = enumType({
  name: 'UserRole',
  members: ['ADMIN', 'USER'],
});

export const User = objectType({
  name: 'User',
  nonNullDefaults: {
    output: true,
  },
  definition(t) {
    t.id('id');
    t.datetime('createdAt');
    t.datetime('updatedAt');
    t.string('email');
    t.string('fullName');
    t.nullable.string('avatarUrl');
    t.field('role', { type: UserRole });
    t.boolean('actived');
    t.boolean('emailVerified');
    t.int('loginCount');
    t.nullable.datetime('deactivedAt');
    t.nullable.datetime('lastLoginAt');
    t.connectionField('posts', {
      type: 'Post',
      nodes: async (root, args, ctx) => {
        const posts = await ctx.dataloader.getPostsByUser.load({
          id: root.id,
          take: args.first,
          cursor: args.after ? args.after : undefined,
        });

        return posts || [];
      },
      totalCount: async () => {
        return 1;
      },
    });
  },
});

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken');
    t.field('user', { type: User });
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: User,
      resolve: () => {
        return null;
      },
    });
    t.connectionField('users', {
      type: User,
      nodes: async (root, args, ctx) => {
        const users = await ctx.db.user.findMany({
          take: args.first,
          cursor: args.after ? { id: args.after } : undefined,
        });

        return users;
      },
      totalCount: (root, args, ctx) => {
        return ctx.db.user.count();
      },
    });
  },
});

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: AuthPayload,
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        const user = await ctx.db.user.findUnique({
          where: { email: args.email },
        });

        if (!user) {
          throw new AuthenticationError('');
        }

        const isMatchPassword = await bcrypt.compare(
          args.password,
          user.password
        );

        if (!isMatchPassword) {
          throw new AuthenticationError('');
        }

        const updatedUser = await ctx.db.user.update({
          where: { id: user.id },
          data: {
            lastLoginAt: new Date(),
            loginCount: user.loginCount + 1,
          },
        });

        return {
          accessToken: jwt.sign({ email: user.email }, env.jwtSecret, {
            subject: user.id,
            expiresIn: '1d',
          }),
          user: updatedUser,
        };
      },
    }),
      t.field('register', {
        type: User,
        args: {
          email: stringArg(),
          password: stringArg(),
          fullName: stringArg(),
        },
        resolve: async (root, args, ctx) => {
          const existed = await ctx.db.user.findUnique({
            where: { email: args.email },
          });

          if (existed) {
            throw new ApolloError('');
          }

          const password = await bcrypt.hash(args.password, 12);
          const user = await ctx.db.user.create({
            data: { ...args, password },
          });

          return user;
        },
      });
  },
});
