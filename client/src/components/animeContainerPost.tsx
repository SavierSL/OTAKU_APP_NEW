import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AnimePost, User } from "../generated/graphql";
import EditAndDeletePost from "./EditAndDeletePost";
import Comments from "./comments";

export interface AnimePostProps {
  anime: Pick<
    AnimePost,
    | "title"
    | "creatorId"
    | "rated"
    | "text"
    | "image_url"
    | "id"
    | "synopsis"
    | "createdAt"
  > & {
    creator: {
      __typename?: "User";
    } & Pick<User, "username">;
  };
}

const AnimePostContainer: React.FC<AnimePostProps> = ({ anime }) => {
  return (
    <>
      <>
        <Box bg="blackAlpha.300" p=".5rem" mt={{ sm: ".5rem", md: '"1rem"' }}>
          <Box
            key={anime.id}
            bg="#0f1123"
            m="1rem"
            borderRadius="1rem"
            shadow="base"
          >
            <Flex
              mt={2}
              flexDirection={{ sm: "column", md: "row" }}
              justifyContent="center"
              alignItems="center"
              pt="1rem"
            >
              <Box
                height="20rem"
                width="18rem"
                p="1rem"
                borderRadius="1rem"
                mb=".5rem"
              >
                <Image
                  src={anime.image_url}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  position="relative"
                  borderRadius="1rem"
                />
              </Box>
              <Box p="2rem" position="relative" height="100%" width="90%">
                <Text height="100%" color="#fff">
                  {anime.text}
                </Text>
                <Text fontSize="1.5rem" color="#fff">
                  Posted by {anime.creator.username}
                </Text>
                <Text color="#fff">{anime.title}</Text>
                <Text color="#f7f7e8" fontSize="1.1rem">
                  {anime.synopsis}
                </Text>

                <EditAndDeletePost anime={anime} />
              </Box>
            </Flex>
          </Box>
          <Comments animePostId={anime.id} />
        </Box>
      </>
    </>
  );
};

export default AnimePostContainer;
