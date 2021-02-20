import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import {
  User as UserModel,
  Profile as ProfileModel,
  Topic as TopicModel,
  Post as PostModel,
  PostSeries as PostSeriesModel,
  Like as LikeModel,
  Comment as CommentModel,
} from '@prisma/client/index.d';
import { Context } from './graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  ok: Scalars['Boolean'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts?: Maybe<PostConnection>;
  topic?: Maybe<Topic>;
  topics?: Maybe<Array<Topic>>;
  topicByName?: Maybe<Topic>;
};

export type QueryPostArgs = {
  postId: Scalars['String'];
};

export type QueryPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['String']>;
};

export type QueryTopicArgs = {
  topicId: Scalars['String'];
};

export type QueryTopicsArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type QueryTopicByNameArgs = {
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ok: Scalars['Boolean'];
  createDraft?: Maybe<Post>;
  publishPost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  deletePost?: Maybe<Scalars['Boolean']>;
  createTopic?: Maybe<Topic>;
  createSubTopic?: Maybe<Topic>;
  updateTopic?: Maybe<Topic>;
  deleteTopic?: Maybe<Topic>;
  followTopic?: Maybe<Topic>;
  unfollowTopic?: Maybe<Topic>;
};

export type MutationCreateDraftArgs = {
  input: CreateDraftInput;
};

export type MutationPublishPostArgs = {
  postId: Scalars['String'];
};

export type MutationUpdatePostArgs = {
  postId: Scalars['String'];
};

export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};

export type MutationCreateTopicArgs = {
  input: CreateTopicInput;
};

export type MutationCreateSubTopicArgs = {
  input: CreateSubTopicInput;
};

export type MutationUpdateTopicArgs = {
  topicId: Scalars['String'];
  input: UpdateTopicInput;
};

export type MutationDeleteTopicArgs = {
  topicId: Scalars['String'];
};

export type MutationFollowTopicArgs = {
  topicId: Scalars['String'];
};

export type MutationUnfollowTopicArgs = {
  topicId: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum UserStatus {
  Enabled = 'enabled',
  Disabled = 'disabled',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
  status: UserStatus;
  profile: Profile;
  posts?: Maybe<Array<Post>>;
  followers: Array<User>;
  following: Array<User>;
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String'];
  gender?: Maybe<Gender>;
  birthDay?: Maybe<Scalars['DateTime']>;
  phone?: Maybe<Scalars['String']>;
};

export type Post = Node & {
  __typename?: 'Post';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  content: Scalars['String'];
  isPublished: Scalars['Boolean'];
  user: User;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node: Post;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  totalCount: Scalars['Int'];
  edges: Array<PostEdge>;
  pageInfo: PageInfo;
};

export type CreateDraftInput = {
  content: Scalars['String'];
};

export type Topic = Node & {
  __typename?: 'Topic';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  isActived: Scalars['Boolean'];
  parent?: Maybe<Topic>;
  children: Array<Topic>;
  childrenCount: Scalars['Int'];
  followerCount: Scalars['Int'];
  posts?: Maybe<Array<Post>>;
};

export type TopicPostsArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type CreateTopicInput = {
  name: Scalars['String'];
};

export type CreateSubTopicInput = {
  name: Scalars['String'];
  parentId: Scalars['String'];
};

export type UpdateTopicInput = {
  name: Scalars['String'];
  isActived: Scalars['Boolean'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node:
    | ResolversTypes['User']
    | ResolversTypes['Post']
    | ResolversTypes['Topic'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  SortOrder: SortOrder;
  UserStatus: UserStatus;
  Gender: Gender;
  User: ResolverTypeWrapper<UserModel>;
  Profile: ResolverTypeWrapper<ProfileModel>;
  Post: ResolverTypeWrapper<PostModel>;
  PostEdge: ResolverTypeWrapper<
    Omit<PostEdge, 'node'> & { node: ResolversTypes['Post'] }
  >;
  PostConnection: ResolverTypeWrapper<
    Omit<PostConnection, 'edges'> & { edges: Array<ResolversTypes['PostEdge']> }
  >;
  CreateDraftInput: CreateDraftInput;
  Topic: ResolverTypeWrapper<TopicModel>;
  CreateTopicInput: CreateTopicInput;
  CreateSubTopicInput: CreateSubTopicInput;
  UpdateTopicInput: UpdateTopicInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  DateTime: Scalars['DateTime'];
  Query: {};
  Boolean: Scalars['Boolean'];
  String: Scalars['String'];
  Int: Scalars['Int'];
  Mutation: {};
  Node:
    | ResolversParentTypes['User']
    | ResolversParentTypes['Post']
    | ResolversParentTypes['Topic'];
  ID: Scalars['ID'];
  PageInfo: PageInfo;
  User: UserModel;
  Profile: ProfileModel;
  Post: PostModel;
  PostEdge: Omit<PostEdge, 'node'> & { node: ResolversParentTypes['Post'] };
  PostConnection: Omit<PostConnection, 'edges'> & {
    edges: Array<ResolversParentTypes['PostEdge']>;
  };
  CreateDraftInput: CreateDraftInput;
  Topic: TopicModel;
  CreateTopicInput: CreateTopicInput;
  CreateSubTopicInput: CreateSubTopicInput;
  UpdateTopicInput: UpdateTopicInput;
}>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  post?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryPostArgs, 'postId'>
  >;
  posts?: Resolver<
    Maybe<ResolversTypes['PostConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryPostsArgs, 'first'>
  >;
  topic?: Resolver<
    Maybe<ResolversTypes['Topic']>,
    ParentType,
    ContextType,
    RequireFields<QueryTopicArgs, 'topicId'>
  >;
  topics?: Resolver<
    Maybe<Array<ResolversTypes['Topic']>>,
    ParentType,
    ContextType,
    RequireFields<QueryTopicsArgs, 'limit'>
  >;
  topicByName?: Resolver<
    Maybe<ResolversTypes['Topic']>,
    ParentType,
    ContextType,
    RequireFields<QueryTopicByNameArgs, 'name'>
  >;
}>;

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createDraft?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateDraftArgs, 'input'>
  >;
  publishPost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationPublishPostArgs, 'postId'>
  >;
  updatePost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePostArgs, 'postId'>
  >;
  deletePost?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostArgs, 'postId'>
  >;
  createTopic?: Resolver<
    Maybe<ResolversTypes['Topic']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateTopicArgs, 'input'>
  >;
  createSubTopic?: Resolver<
    Maybe<ResolversTypes['Topic']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateSubTopicArgs, 'input'>
  >;
  updateTopic?: Resolver<
    Maybe<ResolversTypes['Topic']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTopicArgs, 'topicId' | 'input'>
  >;
  deleteTopic?: Resolver<
    Maybe<ResolversTypes['Topic']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTopicArgs, 'topicId'>
  >;
  followTopic?: Resolver<
    Maybe<ResolversTypes['Topic']>,
    ParentType,
    ContextType,
    RequireFields<MutationFollowTopicArgs, 'topicId'>
  >;
  unfollowTopic?: Resolver<
    Maybe<ResolversTypes['Topic']>,
    ParentType,
    ContextType,
    RequireFields<MutationUnfollowTopicArgs, 'topicId'>
  >;
}>;

export type NodeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'User' | 'Post' | 'Topic',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  endCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatarUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes['UserStatus'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  posts?: Resolver<
    Maybe<Array<ResolversTypes['Post']>>,
    ParentType,
    ContextType
  >;
  followers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  following?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']
> = ResolversObject<{
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  birthDay?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isPublished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']
> = ResolversObject<{
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TopicResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Topic'] = ResolversParentTypes['Topic']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActived?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Topic']>, ParentType, ContextType>;
  children?: Resolver<Array<ResolversTypes['Topic']>, ParentType, ContextType>;
  childrenCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  followerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  posts?: Resolver<
    Maybe<Array<ResolversTypes['Post']>>,
    ParentType,
    ContextType,
    RequireFields<TopicPostsArgs, 'limit'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostEdge?: PostEdgeResolvers<ContextType>;
  PostConnection?: PostConnectionResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
