import userLoader from './user';
import postLoader from './post';

export interface PaginateLoader {
  id: string;
  take: number;
  cursor?: string;
}

export default {
  ...userLoader,
  ...postLoader,
};
