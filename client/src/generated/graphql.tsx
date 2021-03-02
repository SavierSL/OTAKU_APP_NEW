import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  animePost: AnimePost;
  animePosts: PaginatedAnimePosts;
  getAnimePostComment: PaginatedAnimeComments;
  me?: Maybe<User>;
  getFavAnimes: PaginatedFavAnimes;
  getProfile?: Maybe<Profile>;
  getProfilePost: Array<AnimePost>;
};


export type QueryAnimePostArgs = {
  id: Scalars['Int'];
};


export type QueryAnimePostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetAnimePostCommentArgs = {
  animePostId: Scalars['Int'];
};

export type AnimePost = {
  __typename?: 'AnimePost';
  id: Scalars['Int'];
  title: Scalars['String'];
  creatorId: Scalars['Int'];
  creator: User;
  text: Scalars['String'];
  rated: Scalars['String'];
  synopsis: Scalars['String'];
  score: Scalars['String'];
  image_url: Scalars['String'];
  comments: Array<Comment>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  animePost: Array<AnimePost>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Int'];
  comment: Scalars['String'];
  commentorId: Scalars['Int'];
  commentor: User;
  animePostId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedAnimePosts = {
  __typename?: 'PaginatedAnimePosts';
  hasMore: Scalars['Boolean'];
  animes: Array<AnimePost>;
};

export type PaginatedAnimeComments = {
  __typename?: 'PaginatedAnimeComments';
  hasMore: Scalars['Boolean'];
  allComments: Array<Comment>;
};

export type PaginatedFavAnimes = {
  __typename?: 'PaginatedFavAnimes';
  favAnimeList: Array<Anime>;
};

export type Anime = {
  __typename?: 'Anime';
  id: Scalars['Int'];
  title: Scalars['String'];
  fanId: Scalars['Float'];
  rated: Scalars['String'];
  synopsis: Scalars['String'];
  score: Scalars['Float'];
  image_url: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Int'];
  bio: Scalars['String'];
  age: Scalars['String'];
  country: Scalars['String'];
  mostFavouriteCharacter: Scalars['String'];
  userId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAnimePost: AnimePost;
  deletePost: Scalars['Boolean'];
  updatePost: AnimePost;
  commentPost: Comment;
  deleteComment: Scalars['Boolean'];
  updateComment: Comment;
  register: ResponseField;
  login: ResponseField;
  logout: Scalars['Boolean'];
  addFavAnime: Anime;
  removeFavAnime: Scalars['Boolean'];
  createProfile?: Maybe<Profile>;
  updateProfile?: Maybe<Profile>;
};


export type MutationCreateAnimePostArgs = {
  input: AnimePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationUpdatePostArgs = {
  text: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationCommentPostArgs = {
  comment: Scalars['String'];
  animePostId: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateCommentArgs = {
  comment: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationAddFavAnimeArgs = {
  input: FavAnimeInput;
};


export type MutationRemoveFavAnimeArgs = {
  id: Scalars['Int'];
};


export type MutationCreateProfileArgs = {
  mostFavouriteCharacter: Scalars['String'];
  country: Scalars['String'];
  age: Scalars['String'];
  bio: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  mostFavouriteCharacter: Scalars['String'];
  country: Scalars['String'];
  age: Scalars['String'];
  bio: Scalars['String'];
  id: Scalars['Int'];
};

export type AnimePostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  synopsis: Scalars['String'];
  rated: Scalars['String'];
  score: Scalars['String'];
  image_url: Scalars['String'];
};

export type ResponseField = {
  __typename?: 'ResponseField';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type FavAnimeInput = {
  title: Scalars['String'];
  rated: Scalars['String'];
  synopsis: Scalars['String'];
  score: Scalars['Int'];
  image_url: Scalars['String'];
};

export type AddFavAnimeMutationVariables = Exact<{
  title: Scalars['String'];
  rated: Scalars['String'];
  score: Scalars['Int'];
  image_url: Scalars['String'];
  synopsis: Scalars['String'];
}>;


export type AddFavAnimeMutation = (
  { __typename?: 'Mutation' }
  & { addFavAnime: (
    { __typename?: 'Anime' }
    & Pick<Anime, 'title' | 'image_url' | 'id'>
  ) }
);

export type AnimePostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AnimePostQuery = (
  { __typename?: 'Query' }
  & { animePost: (
    { __typename?: 'AnimePost' }
    & Pick<AnimePost, 'title' | 'creatorId' | 'rated' | 'text' | 'image_url' | 'id' | 'synopsis' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type AnimePostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor: Scalars['String'];
}>;


export type AnimePostsQuery = (
  { __typename?: 'Query' }
  & { animePosts: (
    { __typename?: 'PaginatedAnimePosts' }
    & Pick<PaginatedAnimePosts, 'hasMore'>
    & { animes: Array<(
      { __typename?: 'AnimePost' }
      & Pick<AnimePost, 'title' | 'creatorId' | 'rated' | 'text' | 'image_url' | 'id' | 'synopsis' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'id' | 'email' | 'createdAt'>
      ) }
    )> }
  ) }
);

export type CommentPostMutationVariables = Exact<{
  animePostId: Scalars['Int'];
  comment: Scalars['String'];
}>;


export type CommentPostMutation = (
  { __typename?: 'Mutation' }
  & { commentPost: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'comment'>
    & { commentor: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);

export type CreateAnimePostMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
  synopsis: Scalars['String'];
  score: Scalars['String'];
  image_url: Scalars['String'];
  rated: Scalars['String'];
}>;


export type CreateAnimePostMutation = (
  { __typename?: 'Mutation' }
  & { createAnimePost: (
    { __typename?: 'AnimePost' }
    & Pick<AnimePost, 'title' | 'id' | 'text' | 'synopsis' | 'score' | 'image_url' | 'rated' | 'creatorId'>
  ) }
);

export type CreateProfileMutationVariables = Exact<{
  bio: Scalars['String'];
  age: Scalars['String'];
  country: Scalars['String'];
  mostFavouriteCharacter: Scalars['String'];
}>;


export type CreateProfileMutation = (
  { __typename?: 'Mutation' }
  & { createProfile?: Maybe<(
    { __typename?: 'Profile' }
    & Pick<Profile, 'bio' | 'age' | 'country' | 'mostFavouriteCharacter'>
  )> }
);

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type GetAnimePostCommentQueryVariables = Exact<{
  animePostId: Scalars['Int'];
}>;


export type GetAnimePostCommentQuery = (
  { __typename?: 'Query' }
  & { getAnimePostComment: (
    { __typename?: 'PaginatedAnimeComments' }
    & Pick<PaginatedAnimeComments, 'hasMore'>
    & { allComments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'comment'>
      & { commentor: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
);

export type GetFavAnimesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFavAnimesQuery = (
  { __typename?: 'Query' }
  & { getFavAnimes: (
    { __typename?: 'PaginatedFavAnimes' }
    & { favAnimeList: Array<(
      { __typename?: 'Anime' }
      & Pick<Anime, 'title' | 'image_url' | 'id'>
    )> }
  ) }
);

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = (
  { __typename?: 'Query' }
  & { getProfile?: Maybe<(
    { __typename?: 'Profile' }
    & Pick<Profile, 'id' | 'bio' | 'country' | 'mostFavouriteCharacter' | 'age'>
  )> }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'ResponseField' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
    & { animePost: Array<(
      { __typename?: 'AnimePost' }
      & Pick<AnimePost, 'title' | 'creatorId' | 'rated' | 'text' | 'image_url' | 'id' | 'synopsis' | 'createdAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'id' | 'email' | 'createdAt'>
      ) }
    )> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'ResponseField' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type RemoveFavAnimeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveFavAnimeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFavAnime'>
);

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['Int'];
  comment: Scalars['String'];
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'comment' | 'id' | 'commentorId' | 'animePostId'>
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'AnimePost' }
    & Pick<AnimePost, 'title' | 'creatorId' | 'rated' | 'text' | 'image_url' | 'id' | 'synopsis' | 'createdAt'>
  ) }
);

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['Int'];
  bio: Scalars['String'];
  age: Scalars['String'];
  country: Scalars['String'];
  mostFavouriteCharacter: Scalars['String'];
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile?: Maybe<(
    { __typename?: 'Profile' }
    & Pick<Profile, 'bio' | 'age' | 'country' | 'mostFavouriteCharacter'>
  )> }
);


export const AddFavAnimeDocument = gql`
    mutation addFavAnime($title: String!, $rated: String!, $score: Int!, $image_url: String!, $synopsis: String!) {
  addFavAnime(
    input: {title: $title, rated: $rated, score: $score, image_url: $image_url, synopsis: $synopsis}
  ) {
    title
    image_url
    id
  }
}
    `;
export type AddFavAnimeMutationFn = Apollo.MutationFunction<AddFavAnimeMutation, AddFavAnimeMutationVariables>;

/**
 * __useAddFavAnimeMutation__
 *
 * To run a mutation, you first call `useAddFavAnimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFavAnimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFavAnimeMutation, { data, loading, error }] = useAddFavAnimeMutation({
 *   variables: {
 *      title: // value for 'title'
 *      rated: // value for 'rated'
 *      score: // value for 'score'
 *      image_url: // value for 'image_url'
 *      synopsis: // value for 'synopsis'
 *   },
 * });
 */
export function useAddFavAnimeMutation(baseOptions?: Apollo.MutationHookOptions<AddFavAnimeMutation, AddFavAnimeMutationVariables>) {
        return Apollo.useMutation<AddFavAnimeMutation, AddFavAnimeMutationVariables>(AddFavAnimeDocument, baseOptions);
      }
export type AddFavAnimeMutationHookResult = ReturnType<typeof useAddFavAnimeMutation>;
export type AddFavAnimeMutationResult = Apollo.MutationResult<AddFavAnimeMutation>;
export type AddFavAnimeMutationOptions = Apollo.BaseMutationOptions<AddFavAnimeMutation, AddFavAnimeMutationVariables>;
export const AnimePostDocument = gql`
    query animePost($id: Int!) {
  animePost(id: $id) {
    title
    creatorId
    rated
    text
    image_url
    id
    creatorId
    synopsis
    createdAt
    creator {
      id
      username
    }
  }
}
    `;

/**
 * __useAnimePostQuery__
 *
 * To run a query within a React component, call `useAnimePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnimePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAnimePostQuery(baseOptions: Apollo.QueryHookOptions<AnimePostQuery, AnimePostQueryVariables>) {
        return Apollo.useQuery<AnimePostQuery, AnimePostQueryVariables>(AnimePostDocument, baseOptions);
      }
export function useAnimePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnimePostQuery, AnimePostQueryVariables>) {
          return Apollo.useLazyQuery<AnimePostQuery, AnimePostQueryVariables>(AnimePostDocument, baseOptions);
        }
export type AnimePostQueryHookResult = ReturnType<typeof useAnimePostQuery>;
export type AnimePostLazyQueryHookResult = ReturnType<typeof useAnimePostLazyQuery>;
export type AnimePostQueryResult = Apollo.QueryResult<AnimePostQuery, AnimePostQueryVariables>;
export const AnimePostsDocument = gql`
    query animePosts($limit: Int!, $cursor: String!) {
  animePosts(limit: $limit, cursor: $cursor) {
    hasMore
    animes {
      title
      creatorId
      rated
      text
      image_url
      id
      creatorId
      synopsis
      createdAt
      creator {
        username
        id
        email
        createdAt
      }
    }
  }
}
    `;

/**
 * __useAnimePostsQuery__
 *
 * To run a query within a React component, call `useAnimePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnimePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useAnimePostsQuery(baseOptions: Apollo.QueryHookOptions<AnimePostsQuery, AnimePostsQueryVariables>) {
        return Apollo.useQuery<AnimePostsQuery, AnimePostsQueryVariables>(AnimePostsDocument, baseOptions);
      }
export function useAnimePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnimePostsQuery, AnimePostsQueryVariables>) {
          return Apollo.useLazyQuery<AnimePostsQuery, AnimePostsQueryVariables>(AnimePostsDocument, baseOptions);
        }
export type AnimePostsQueryHookResult = ReturnType<typeof useAnimePostsQuery>;
export type AnimePostsLazyQueryHookResult = ReturnType<typeof useAnimePostsLazyQuery>;
export type AnimePostsQueryResult = Apollo.QueryResult<AnimePostsQuery, AnimePostsQueryVariables>;
export const CommentPostDocument = gql`
    mutation commentPost($animePostId: Int!, $comment: String!) {
  commentPost(animePostId: $animePostId, comment: $comment) {
    id
    comment
    commentor {
      id
      username
    }
  }
}
    `;
export type CommentPostMutationFn = Apollo.MutationFunction<CommentPostMutation, CommentPostMutationVariables>;

/**
 * __useCommentPostMutation__
 *
 * To run a mutation, you first call `useCommentPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentPostMutation, { data, loading, error }] = useCommentPostMutation({
 *   variables: {
 *      animePostId: // value for 'animePostId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCommentPostMutation(baseOptions?: Apollo.MutationHookOptions<CommentPostMutation, CommentPostMutationVariables>) {
        return Apollo.useMutation<CommentPostMutation, CommentPostMutationVariables>(CommentPostDocument, baseOptions);
      }
export type CommentPostMutationHookResult = ReturnType<typeof useCommentPostMutation>;
export type CommentPostMutationResult = Apollo.MutationResult<CommentPostMutation>;
export type CommentPostMutationOptions = Apollo.BaseMutationOptions<CommentPostMutation, CommentPostMutationVariables>;
export const CreateAnimePostDocument = gql`
    mutation createAnimePost($title: String!, $text: String!, $synopsis: String!, $score: String!, $image_url: String!, $rated: String!) {
  createAnimePost(
    input: {title: $title, text: $text, synopsis: $synopsis, score: $score, image_url: $image_url, rated: $rated}
  ) {
    title
    id
    text
    synopsis
    score
    image_url
    rated
    creatorId
  }
}
    `;
export type CreateAnimePostMutationFn = Apollo.MutationFunction<CreateAnimePostMutation, CreateAnimePostMutationVariables>;

/**
 * __useCreateAnimePostMutation__
 *
 * To run a mutation, you first call `useCreateAnimePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnimePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnimePostMutation, { data, loading, error }] = useCreateAnimePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      synopsis: // value for 'synopsis'
 *      score: // value for 'score'
 *      image_url: // value for 'image_url'
 *      rated: // value for 'rated'
 *   },
 * });
 */
export function useCreateAnimePostMutation(baseOptions?: Apollo.MutationHookOptions<CreateAnimePostMutation, CreateAnimePostMutationVariables>) {
        return Apollo.useMutation<CreateAnimePostMutation, CreateAnimePostMutationVariables>(CreateAnimePostDocument, baseOptions);
      }
export type CreateAnimePostMutationHookResult = ReturnType<typeof useCreateAnimePostMutation>;
export type CreateAnimePostMutationResult = Apollo.MutationResult<CreateAnimePostMutation>;
export type CreateAnimePostMutationOptions = Apollo.BaseMutationOptions<CreateAnimePostMutation, CreateAnimePostMutationVariables>;
export const CreateProfileDocument = gql`
    mutation createProfile($bio: String!, $age: String!, $country: String!, $mostFavouriteCharacter: String!) {
  createProfile(
    bio: $bio
    age: $age
    country: $country
    mostFavouriteCharacter: $mostFavouriteCharacter
  ) {
    bio
    age
    country
    mostFavouriteCharacter
  }
}
    `;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *      age: // value for 'age'
 *      country: // value for 'country'
 *      mostFavouriteCharacter: // value for 'mostFavouriteCharacter'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, baseOptions);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($id: Int!) {
  deleteComment(id: $id)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: Int!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const GetAnimePostCommentDocument = gql`
    query getAnimePostComment($animePostId: Int!) {
  getAnimePostComment(animePostId: $animePostId) {
    hasMore
    allComments {
      id
      comment
      commentor {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useGetAnimePostCommentQuery__
 *
 * To run a query within a React component, call `useGetAnimePostCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnimePostCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnimePostCommentQuery({
 *   variables: {
 *      animePostId: // value for 'animePostId'
 *   },
 * });
 */
export function useGetAnimePostCommentQuery(baseOptions: Apollo.QueryHookOptions<GetAnimePostCommentQuery, GetAnimePostCommentQueryVariables>) {
        return Apollo.useQuery<GetAnimePostCommentQuery, GetAnimePostCommentQueryVariables>(GetAnimePostCommentDocument, baseOptions);
      }
export function useGetAnimePostCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnimePostCommentQuery, GetAnimePostCommentQueryVariables>) {
          return Apollo.useLazyQuery<GetAnimePostCommentQuery, GetAnimePostCommentQueryVariables>(GetAnimePostCommentDocument, baseOptions);
        }
export type GetAnimePostCommentQueryHookResult = ReturnType<typeof useGetAnimePostCommentQuery>;
export type GetAnimePostCommentLazyQueryHookResult = ReturnType<typeof useGetAnimePostCommentLazyQuery>;
export type GetAnimePostCommentQueryResult = Apollo.QueryResult<GetAnimePostCommentQuery, GetAnimePostCommentQueryVariables>;
export const GetFavAnimesDocument = gql`
    query getFavAnimes {
  getFavAnimes {
    favAnimeList {
      title
      image_url
      id
    }
  }
}
    `;

/**
 * __useGetFavAnimesQuery__
 *
 * To run a query within a React component, call `useGetFavAnimesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavAnimesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavAnimesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFavAnimesQuery(baseOptions?: Apollo.QueryHookOptions<GetFavAnimesQuery, GetFavAnimesQueryVariables>) {
        return Apollo.useQuery<GetFavAnimesQuery, GetFavAnimesQueryVariables>(GetFavAnimesDocument, baseOptions);
      }
export function useGetFavAnimesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFavAnimesQuery, GetFavAnimesQueryVariables>) {
          return Apollo.useLazyQuery<GetFavAnimesQuery, GetFavAnimesQueryVariables>(GetFavAnimesDocument, baseOptions);
        }
export type GetFavAnimesQueryHookResult = ReturnType<typeof useGetFavAnimesQuery>;
export type GetFavAnimesLazyQueryHookResult = ReturnType<typeof useGetFavAnimesLazyQuery>;
export type GetFavAnimesQueryResult = Apollo.QueryResult<GetFavAnimesQuery, GetFavAnimesQueryVariables>;
export const GetProfileDocument = gql`
    query getProfile {
  getProfile {
    id
    bio
    country
    mostFavouriteCharacter
    age
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const LoginDocument = gql`
    mutation login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    username
    email
    animePost {
      title
      creatorId
      rated
      text
      image_url
      id
      creatorId
      synopsis
      createdAt
      creator {
        username
        id
        email
        createdAt
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation register($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveFavAnimeDocument = gql`
    mutation removeFavAnime($id: Int!) {
  removeFavAnime(id: $id)
}
    `;
export type RemoveFavAnimeMutationFn = Apollo.MutationFunction<RemoveFavAnimeMutation, RemoveFavAnimeMutationVariables>;

/**
 * __useRemoveFavAnimeMutation__
 *
 * To run a mutation, you first call `useRemoveFavAnimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFavAnimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFavAnimeMutation, { data, loading, error }] = useRemoveFavAnimeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveFavAnimeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFavAnimeMutation, RemoveFavAnimeMutationVariables>) {
        return Apollo.useMutation<RemoveFavAnimeMutation, RemoveFavAnimeMutationVariables>(RemoveFavAnimeDocument, baseOptions);
      }
export type RemoveFavAnimeMutationHookResult = ReturnType<typeof useRemoveFavAnimeMutation>;
export type RemoveFavAnimeMutationResult = Apollo.MutationResult<RemoveFavAnimeMutation>;
export type RemoveFavAnimeMutationOptions = Apollo.BaseMutationOptions<RemoveFavAnimeMutation, RemoveFavAnimeMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation updateComment($id: Int!, $comment: String!) {
  updateComment(id: $id, comment: $comment) {
    comment
    id
    commentorId
    animePostId
  }
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, baseOptions);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($id: Int!, $title: String!, $text: String!) {
  updatePost(id: $id, title: $title, text: $text) {
    title
    creatorId
    rated
    text
    image_url
    id
    creatorId
    synopsis
    createdAt
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($id: Int!, $bio: String!, $age: String!, $country: String!, $mostFavouriteCharacter: String!) {
  updateProfile(
    id: $id
    bio: $bio
    age: $age
    country: $country
    mostFavouriteCharacter: $mostFavouriteCharacter
  ) {
    bio
    age
    country
    mostFavouriteCharacter
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      bio: // value for 'bio'
 *      age: // value for 'age'
 *      country: // value for 'country'
 *      mostFavouriteCharacter: // value for 'mostFavouriteCharacter'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, baseOptions);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;