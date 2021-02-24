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

  return (
    <>
      {MeData?.me?.id === anime.creatorId ? (
        <>
          <NextLink href="/post/edit/[id]" as={`/post/edit/${anime.id}`}>
            <Button bg="#0f1123" as={Link} color="green">
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
            }}
            bg="#0f1123"
            color="red"
            ml="1rem"
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
