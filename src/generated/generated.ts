import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  payload: Scalars['String'];
  photo: Photo;
  updatedAt: Scalars['String'];
  user: User;
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createdAt: Scalars['String'];
  hashtag: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type LoginRes = {
  __typename?: 'LoginRes';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  payload: Scalars['String'];
  unread: Scalars['Boolean'];
  updatedAt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: MutationRes;
  createMessage: MutationRes;
  createPhoto: MutationRes;
  createRoom: MutationRes;
  deleteAccount: MutationRes;
  deleteComment: MutationRes;
  deletePhoto: MutationRes;
  editComment: MutationRes;
  editPhoto: MutationRes;
  editProfile: MutationRes;
  exitRoom: MutationRes;
  follow: MutationRes;
  likePhoto: MutationRes;
  login: LoginRes;
  readMessage: MutationRes;
  signUp: MutationRes;
  unfollow: MutationRes;
  unlikePhoto: MutationRes;
};


export type MutationCreateCommentArgs = {
  payload: Scalars['String'];
  photoId: Scalars['Int'];
};


export type MutationCreateMessageArgs = {
  payload: Scalars['String'];
  roomId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


export type MutationCreatePhotoArgs = {
  caption?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
};


export type MutationCreateRoomArgs = {
  userId: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int'];
};


export type MutationDeletePhotoArgs = {
  photoId: Scalars['Int'];
};


export type MutationEditCommentArgs = {
  commentId: Scalars['Int'];
  payload: Scalars['String'];
};


export type MutationEditPhotoArgs = {
  caption?: InputMaybe<Scalars['String']>;
  photoId: Scalars['Int'];
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  email?: InputMaybe<Scalars['String']>;
};


export type MutationExitRoomArgs = {
  roomId: Scalars['Int'];
};


export type MutationFollowArgs = {
  userId: Scalars['Int'];
};


export type MutationLikePhotoArgs = {
  photoId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationReadMessageArgs = {
  messageId: Scalars['Int'];
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUnfollowArgs = {
  userId: Scalars['Int'];
};


export type MutationUnlikePhotoArgs = {
  photoId: Scalars['Int'];
};

export type MutationRes = {
  __typename?: 'MutationRes';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
};

export type Photo = {
  __typename?: 'Photo';
  caption?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isLiked: Scalars['Boolean'];
  totalComments: Scalars['Int'];
  totalLikes: Scalars['Int'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  photoDetail?: Maybe<Photo>;
  searchHashtags?: Maybe<Array<Maybe<Hashtag>>>;
  searchUsers?: Maybe<Array<Maybe<User>>>;
  seeComments?: Maybe<Array<Maybe<Comment>>>;
  seeFeed?: Maybe<Array<Maybe<Photo>>>;
  seeFollowers?: Maybe<Array<Maybe<User>>>;
  seeFollowing?: Maybe<Array<Maybe<User>>>;
  seeLikeUsers?: Maybe<Array<Maybe<User>>>;
  seeMe?: Maybe<User>;
  seeMessages?: Maybe<Array<Maybe<Message>>>;
  seePhotosByHashtag?: Maybe<Array<Maybe<Photo>>>;
  seePhotosByUser?: Maybe<Array<Maybe<Photo>>>;
  seeProfile?: Maybe<User>;
  seeRoom?: Maybe<Room>;
  seeRooms?: Maybe<Array<Maybe<Room>>>;
};


export type QueryPhotoDetailArgs = {
  photoId: Scalars['Int'];
};


export type QuerySearchHashtagsArgs = {
  key: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  key: Scalars['String'];
};


export type QuerySeeCommentsArgs = {
  offset?: InputMaybe<Scalars['Int']>;
  photoId: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
};


export type QuerySeeFeedArgs = {
  offset?: InputMaybe<Scalars['Int']>;
};


export type QuerySeeFollowersArgs = {
  userId: Scalars['Int'];
};


export type QuerySeeFollowingArgs = {
  userId: Scalars['Int'];
};


export type QuerySeeLikeUsersArgs = {
  photoId: Scalars['Int'];
};


export type QuerySeeMessagesArgs = {
  roomId: Scalars['Int'];
};


export type QuerySeePhotosByHashtagArgs = {
  hashtagId: Scalars['Int'];
};


export type QuerySeePhotosByUserArgs = {
  userId: Scalars['Int'];
};


export type QuerySeeProfileArgs = {
  userId: Scalars['Int'];
};


export type QuerySeeRoomArgs = {
  roomId: Scalars['Int'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  totalUnread: Scalars['Int'];
  updatedAt: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  roomUpdated?: Maybe<Message>;
};


export type SubscriptionRoomUpdatedArgs = {
  roomId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isFollowing: Scalars['Boolean'];
  totalFollowers: Scalars['Int'];
  totalFollowing: Scalars['Int'];
  totalPosts: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type CreateCommentMutationVariables = Exact<{
  photoId: Scalars['Int'];
  payload: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'MutationRes', ok: boolean, id?: number | null, error?: string | null } };

export type NewCommentFragment = { __typename: 'Comment', id: number, payload: string, user: { __typename?: 'User', id: number, username: string, avatar?: string | null } };

export type SeeCommentsQueryVariables = Exact<{
  photoId: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
}>;


export type SeeCommentsQuery = { __typename?: 'Query', seeComments?: Array<{ __typename?: 'Comment', id: number, payload: string, user: { __typename?: 'User', id: number, avatar?: string | null, username: string } } | null> | null };

export type LikePhotoMutationVariables = Exact<{
  photoId: Scalars['Int'];
}>;


export type LikePhotoMutation = { __typename?: 'Mutation', likePhoto: { __typename?: 'MutationRes', ok: boolean, error?: string | null } };

export type UnlikePhotoMutationVariables = Exact<{
  photoId: Scalars['Int'];
}>;


export type UnlikePhotoMutation = { __typename?: 'Mutation', unlikePhoto: { __typename?: 'MutationRes', ok: boolean, error?: string | null } };

export type SeeMeQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeMeQuery = { __typename?: 'Query', seeMe?: { __typename?: 'User', id: number, username: string, avatar?: string | null, email?: string | null } | null };

export type SeeFeedQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type SeeFeedQuery = { __typename?: 'Query', seeFeed?: Array<{ __typename?: 'Photo', id: number, url: string, caption?: string | null, isLiked: boolean, totalLikes: number, totalComments: number, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatar?: string | null } } | null> | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginRes', ok: boolean, token?: string | null, error?: string | null } };

export type SeeProfileWithPhotosQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type SeeProfileWithPhotosQuery = { __typename?: 'Query', seeProfile?: { __typename?: 'User', id: number, username: string, avatar?: string | null, isFollowing: boolean, totalPosts: number, totalFollowing: number, totalFollowers: number } | null, seePhotosByUser?: Array<{ __typename?: 'Photo', id: number, url: string, totalLikes: number, totalComments: number } | null> | null };

export type SignUpMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'MutationRes', ok: boolean, error?: string | null } };

export const NewCommentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewComment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<NewCommentFragment, unknown>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"photoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const SeeCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seeComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"photoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<SeeCommentsQuery, SeeCommentsQueryVariables>;
export const LikePhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"likePhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likePhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"photoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LikePhotoMutation, LikePhotoMutationVariables>;
export const UnlikePhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unlikePhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikePhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"photoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<UnlikePhotoMutation, UnlikePhotoMutationVariables>;
export const SeeMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seeMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SeeMeQuery, SeeMeQueryVariables>;
export const SeeFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seeFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"totalLikes"}},{"kind":"Field","name":{"kind":"Name","value":"totalComments"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<SeeFeedQuery, SeeFeedQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SeeProfileWithPhotosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seeProfileWithPhotos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"totalPosts"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seePhotosByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"totalLikes"}},{"kind":"Field","name":{"kind":"Name","value":"totalComments"}}]}}]}}]} as unknown as DocumentNode<SeeProfileWithPhotosQuery, SeeProfileWithPhotosQueryVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;