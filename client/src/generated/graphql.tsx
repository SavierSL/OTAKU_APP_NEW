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
  animePosts: PaginatedAnimePosts;
};


export type QueryAnimePostsArgs = {
  cursor: Scalars['String'];
  limit: Scalars['Int'];
};

export type PaginatedAnimePosts = {
  __typename?: 'PaginatedAnimePosts';
  hasMore: Scalars['Boolean'];
  animes: Array<AnimePost>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createAnimePost: AnimePost;
  register: ResponseField;
  login: ResponseField;
  createProfile: Profile;
};


export type MutationCreateAnimePostArgs = {
  input: AnimePostInput;
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