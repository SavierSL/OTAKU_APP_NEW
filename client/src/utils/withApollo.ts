import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { PaginatedAnimePosts } from "../generated/graphql";

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
                  animes: [...(existing?.animes || []), ...incoming.animes],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
