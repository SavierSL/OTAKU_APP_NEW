import { Flex, Image, Text, Link, Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import {
  AnimePost,
  AnimePostQuery,
  useAnimePostsQuery,
  useDeletePostMutation,
  useMeQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/isAuth";
import { withApollo } from "../utils/withApollo";
import NavBar from "../components/navBar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Comments from "../components/comments";
import { FetchMoreOptions } from "@apollo/client";

export interface AnimePostContentProps {
  anime: Pick<
    AnimePost,
    | "title"
    | "text"
    | "creatorId"
    | "rated"
    | "image_url"
    | "id"
    | "synopsis"
    | "createdAt"
  >;
}

const EditAndDeletePost: React.FC<AnimePostContentProps> = ({ anime }) => {
  const { data: MeData, loading: MeLoading } = useMeQuery();
  const [deletePost, { loading: deleteLoading }] = useDeletePostMutation();
  const { data, loading, fetchMore, variables } = useAnimePostsQuery({
    variables: {
      limit: 2,
      cursor: "",
    },
  });
  return (
    <>
      {MeData?.me?.id === anime.creatorId ? (
        <>
          <NextLink href="/post/edit/[id]" as={`/post/edit/${anime.id}`}>
            <Button as={Link} color="green">
              Edit
            </Button>
          </NextLink>
          <Button
            isLoading={deleteLoading}
            onClick={async () => {
              await deletePost({
                variables: { id: anime.id },
                update: (cache) => {
                  cache.evict({
                    id: "AnimePost:" + anime.id,
                  });
                },
              });
              await fetchMore({
                variables: {
                  limit: 1,
                  cursor:
                    data.animePosts.animes[data.animePosts.animes.length - 1]
                      .createdAt,
                },
              });
            }}
          >
            Delete
          </Button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default EditAndDeletePost;
