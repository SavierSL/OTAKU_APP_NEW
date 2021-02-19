import { Flex, Image, Text, Link, Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { useAnimePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

export interface IndexProps {}

const Home: React.FC<IndexProps> = () => {
  const [hasMore, setHasMore] = useState("");
  const { data, loading, fetchMore, variables } = useAnimePostsQuery({
    variables: {
      limit: 2,
      cursor: "",
    },
  });
  console.log(data?.animePosts.animes);
  if (!loading && !data) {
    return (
      <div>
        <NextLink href="create-post">
          <Link>Create Post</Link>
        </NextLink>
      </div>
    );
  }
  return (
    <>
      <NextLink href="create-post">
        <Link>Create Post haha</Link>
      </NextLink>
      <Box m="auto">
        <Box position="absolute" right="5rem" w="70%" p={4}>
          {!data && loading ? (
            <div></div>
          ) : (
            data!.animePosts.animes.map((anime) => {
              return !anime ? null : (
                <Box bg="#f6f5f5" m="1rem" borderRadius="1rem" shadow="base">
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
                    <Box p="2rem" position="relative" height="100%" width="90%">
                      <Text bg="#d3e0ea" height="100%">
                        {anime.text}
                      </Text>
                      <Text>Posted by {anime.creator.username}</Text>
                      <Text>{anime.title}</Text>
                      <Text>{anime.synopsis}</Text>
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
                    data.animePosts.animes[data.animePosts.animes.length - 1]
                      .createdAt,
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
  );
};

export default withApollo({ ssr: true })(Home);
