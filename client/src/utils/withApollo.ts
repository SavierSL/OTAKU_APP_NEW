import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import {
  CommentPostMutationResult,
  GetAnimePostCommentQueryResult,
  GetFavAnimesLazyQueryHookResult,
  GetFavAnimesQuery,
  GetFavAnimesQueryResult,
  GetFavAnimesQueryVariables,
  PaginatedAnimeComments,
  PaginatedAnimePosts,
  PaginatedFavAnimes,
} from "../generated/graphql";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: "http://localhost:5000/graphql",
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        //Query
        Query: {
          fields: {
            //posts query
            animePosts: {
              //DONT FORGET TO ADD KEY ARGS
              //key args of posts
              keyArgs: [],
              merge(
                existing: PaginatedAnimePosts | undefined,
                incoming: PaginatedAnimePosts
              ): PaginatedAnimePosts {
                //Adding new posts
                return {
                  ...incoming,
                  //we need to add existing for the load more
                  animes: [...(existing?.animes || []), ...incoming.animes],
                };
              },
            },
            getAnimePostComment: {
              merge(
                existing: PaginatedAnimeComments | undefined,
                incoming: PaginatedAnimeComments | undefined
              ): PaginatedAnimeComments {
                //Adding new comments or updated

                return {
                  __typename: "PaginatedAnimeComments",
                  ...incoming,
                  //we need the incoming bc we are using a variables in this query
                  //so we need the incoming posts only
                  allComments: [...(incoming?.allComments || [])],

                  // data: {
                  //   __typename: "Query",
                  //   getAnimePostComment: [
                  //     ...(existing.data.getAnimePostComment || []),
                  //     ...incoming.data.getAnimePostComment,
                  //   ],
                  // },
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
