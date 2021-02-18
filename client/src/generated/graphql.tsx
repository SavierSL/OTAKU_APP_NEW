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

export type AnimePost = {
  __typename?: 'AnimePost';
  id: Scalars['Int'];
  title: Scalars['String'];
  creatorId: Scalars['Float'];
  text: Scalars['String'];
  rated: Scalars['String'];
  synopsis: Scalars['String'];
  score: Scalars['Int'];
  imageUrl: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type AnimePostInput = {
  title: Scalars['String'];
  creatorId: Scalars['Int'];
  text: Scalars['String'];
  synopsis: Scalars['String'];
  rated: Scalars['String'];
  score: Scalars['Int'];
  imageUrl: Scalars['String'];
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

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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

export type CreateAnimePostMutationVariables = Exact<{
  title: Scalars['String'];
  creatorId: Scalars['Int'];
  text: Scalars['String'];
  synopsis: Scalars['String'];
  score: Scalars['Int'];
  imageUrl: Scalars['String'];
  rated: Scalars['String'];
}>;


export type CreateAnimePostMutation = (
  { __typename?: 'Mutation' }
  & { createAnimePost: (
    { __typename?: 'AnimePost' }
    & Pick<AnimePost, 'title' | 'id' | 'text' | 'synopsis' | 'score' | 'imageUrl' | 'rated'>
  ) }
);


export const CreateAnimePostDocument = gql`
    mutation createAnimePost($title: String!, $creatorId: Int!, $text: String!, $synopsis: String!, $score: Int!, $imageUrl: String!, $rated: String!) {
  createAnimePost(
    input: {title: $title, creatorId: $creatorId, text: $text, synopsis: $synopsis, score: $score, imageUrl: $imageUrl, rated: $rated}
  ) {
    title
    id
    text
    synopsis
    score
    imageUrl
    id
    rated
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
 *      creatorId: // value for 'creatorId'
 *      text: // value for 'text'
 *      synopsis: // value for 'synopsis'
 *      score: // value for 'score'
 *      imageUrl: // value for 'imageUrl'
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