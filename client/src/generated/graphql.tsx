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
  me?: Maybe<User>;
};


export type QueryAnimePostArgs = {
  id: Scalars['Int'];
};


export type QueryAnimePostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
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
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedAnimePosts = {
  __typename?: 'PaginatedAnimePosts';
  hasMore: Scalars['Boolean'];
  animes: Array<AnimePost>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAnimePost: AnimePost;
  deletePost: Scalars['Boolean'];
  updatePost: AnimePost;
  register: ResponseField;
  login: ResponseField;
  createProfile: Profile;
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


export type MutationRegisterArgs = {
  options: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateProfileArgs = {
  input: ProfileInput;
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

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['Int'];
  favouriteAnimes: Scalars['String'];
  mostFavouriteCharacter: Scalars['String'];
  userId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProfileInput = {
  favouriteAnimes: Scalars['String'];
  mostFavouriteCharacter: Scalars['String'];
};

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

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )> }
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
export const MeDocument = gql`
    query me {
  me {
    id
    username
    email
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