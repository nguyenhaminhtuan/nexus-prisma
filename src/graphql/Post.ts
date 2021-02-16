import { extendType, objectType, stringArg } from 'nexus';

export const Post = objectType({
  name: 'Post',
  nonNullDefaults: {
    output: true,
  },
  definition(t) {
    t.id('id');
    t.datetime('createdAt');
    t.datetime('updatedAt');
    t.string('title');
    t.string('content');
    t.boolean('published');
    t.field('author', {
      type: 'User',
      resolve: async (root, args, ctx) => {
        return ctx.dataloader.getUser.load(root.authorId);
      },
    });
  },
});

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('posts', {
      type: Post,
      list: true,
      resolve: async (root, args, ctx) => {
        const posts = await ctx.db.post.findMany();

        return posts;
      },
    });
  },
});

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDraft', {
      type: Post,
      args: {
        title: stringArg(),
        content: stringArg(),
      },
      resolve: async (root, args, ctx) => {
        const post = await ctx.db.post.create({
          data: { ...args, authorId: ctx.req.user.sub },
        });

        return post;
      },
    });
    t.field('publishPost', {
      type: Post,
      args: {
        postId: stringArg(),
      },
      resolve: (parent, args, ctx) => {
        return ctx.db.post.update({
          where: { id: args.postId },
          data: {
            published: true,
            createdAt: new Date(),
          },
        });
      },
    });
  },
});
