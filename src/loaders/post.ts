import DataLoader from 'dataloader';
import db from '../db';
import { Post } from '@prisma/client';
import { PaginateLoader } from '.';
import loGroupBy from 'lodash/groupBy';

const postLoader = {
  getPostsByUser: new DataLoader<PaginateLoader, Post[]>(async (params) => {
    const ids = params.map((param) => param.id);
    const posts = await db.post.findMany({
      where: { userId: { in: ids } },
    });
    const postsByAuthorId = loGroupBy(posts, (post) => post.userId);

    return ids.map((id) => postsByAuthorId[id]);
  }),
};

export default postLoader;
