import { Flex, Image, Text, Link, Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import {
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

export interface IndexProps {}

const Home: React.FC<IndexProps> = () => {
  const router = useRouter();

  const { data: MeData, loading: MeLoading } = useMeQuery();
  const [deletePost, { loading: deleteLoading }] = useDeletePostMutation();
  const { data, loading, fetchMore, variables } = useAnimePostsQuery({
    variables: {
      limit: 2,
      cursor: "",
    },
  });
  useEffect(() => {
    //there is no data and not loading
    if (!MeData?.me && !MeLoading) {
      // if it failed this next query will be added and the router.pathname, it is depend on the url 'dynamic'
      // we are telling if where ti should go after it logged in
      // this will become /login?next=/create-post. if logged in will go to create-post
      router.push("/");
    }
  }, []);
  return (
    <>
      {MeData?.me ? (
        <>
          <NavBar />
          <NextLink href="create-post">
            <Link>Create Post haha</Link>
          </NextLink>
          <Box m="auto">
            <Box position="absolute" right="5rem" w="70%" p={4}>
              {!data && loading ? (
                <div></div>
              ) : (
                data!.animePosts.animes.map((anime) => {
                  return !anime && !MeData?.me ? null : (
                    <Box
                      key={anime.id}
                      bg="#f6f5f5"
                      m="1rem"
                      borderRadius="1rem"
                      shadow="base"
                    >
                      <Flex
                        mt={2}
                        flexDirection={{ sm: "column", md: "row" }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          height="20rem"
                          width="18rem"
                          p="1rem"
                          borderRadius="1rem"
                        >
                          <Image
                            src={anime.image_url}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            position="relative"
                          />
                        </Box>
                        <Box
                          p="2rem"
                          position="relative"
                          height="100%"
                          width="90%"
                        >
                          <Text bg="#d3e0ea" height="100%">
                            {anime.text}
                          </Text>
                          <Text>Posted by {anime.creator.username}</Text>
                          <Text>{anime.title}</Text>
                          <Text>{anime.synopsis}</Text>
                          <Comments animePostId={anime.id} />
                          {MeData?.me?.id === anime.creatorId ? (
                            <>
                              <NextLink
                                href="/post/edit/[id]"
                                as={`/post/edit/${anime.id}`}
                              >
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
                                        data.animePosts.animes[
                                          data.animePosts.animes.length - 1
                                        ].createdAt,
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
                        </Box>
                      </Flex>
                    </Box>
                  );
                })
              )}
            </Box>
            {data?.animePosts.hasMore && data ? (
              <Button
                onClick={() =>
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      cursor:
                        data.animePosts.animes[
                          data.animePosts.animes.length - 1
                        ].createdAt,
                    },
                  })
                }
              >
                Load More
              </Button>
            ) : (
              ""
            )}
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default withApollo({ ssr: true })(Home);
