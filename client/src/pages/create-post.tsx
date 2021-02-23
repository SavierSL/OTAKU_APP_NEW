import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import AnimeContent from "../components/createAnimeContent";
import InputField from "../components/inputField";
import Wrapper from "../components/wrapper";
import { withApollo } from "../utils/withApollo";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/isAuth";
import {
  useAnimePostsQuery,
  useDeletePostMutation,
  useMeQuery,
} from "../generated/graphql";

export interface CreatePostProps {}
export interface Anime {
  title: string;
  rated: string;
  synopsis: string;
  score: string;
  image_url: string;
}

const CreatePost: React.FC<CreatePostProps> = () => {
  const router = useRouter();
  const { data: MeData, loading: MeLoading } = useMeQuery();
  const [animes, setAnimes] = useState([]);
  const [animePost, setAnimePost] = useState<Anime>(null);
  const getAnime = async (animeTitle: string) => {
    const res = await fetch(
      `https://jikan1.p.rapidapi.com/search/anime?q=${animeTitle}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "0a1e2916a5msh44da6893e3cecdbp108d8bjsne9ac3d4c9fd4",
          "x-rapidapi-host": "jikan1.p.rapidapi.com",
        },
      }
    );
    const animes = await res.json();
    return animes.results;
  };

  if (!MeData?.me && !MeLoading) {
    // if it failed this next query will be added and the router.pathname, it is depend on the url 'dynamic'
    // we are telling if where ti should go after it logged in
    // this will become /login?next=/create-post. if logged in will go to create-post
    router.push("/");
  }

  return (
    <>
      Create Anime Post
      <NextLink href="home">
        <Link>HOME</Link>
      </NextLink>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const data = await getAnime(values.title);
          setAnimes(data.slice(0, 5));
          return data;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Search for anime title"
              label="Search"
            />
            <SimpleGrid
              columns={{ sm: 4, md: 5, lg: 1 }}
              spacing="10px"
              minChildWidth={{ sm: "500px", md: "250px", lg: "200px" }}
            >
              {animes.length !== 0
                ? animes.map((anime: Anime) => {
                    return (
                      <Box mt={2}>
                        <Wrapper variant="regular">
                          <Flex
                            bg="aliceblue"
                            borderRadius={10}
                            alignItems="center"
                            p={4}
                            justifyContent="space-between"
                          >
                            <Text>{anime.title}</Text>
                            <Box height="10rem" width="8rem" ml={3} pr={3}>
                              <Image
                                src={anime.image_url}
                                height="100%"
                                width="100%"
                                objectFit="cover"
                                position="relative"
                              />
                            </Box>
                          </Flex>
                          <Button
                            bg="azure"
                            onClick={() => {
                              const animeScore = anime.score + "";

                              setAnimePost({
                                title: anime.title,
                                image_url: anime.image_url,
                                rated: anime.rated,
                                score: animeScore,
                                synopsis: anime.synopsis,
                              });
                              setAnimes([]);
                            }}
                          >
                            ADD ANIME
                          </Button>
                        </Wrapper>
                      </Box>
                    );
                  })
                : ""}
            </SimpleGrid>
            <Button type="submit" isLoading={isSubmitting}>
              search
            </Button>
          </Form>
        )}
      </Formik>
      {animePost ? (
        <>
          <Image
            src={animePost.image_url}
            height={200}
            objectFit="cover"
            position="relative"
          />

          <Box>
            <Text fontWeight={500} fontSize={30}>
              {animePost.title}
            </Text>
            <Text fontWeight={500} fontSize={20}>
              {animePost.rated}
            </Text>
            <Text fontWeight={500} fontSize={20}>
              {animePost.score}
            </Text>
            <Text fontWeight={500} fontSize={20}>
              {animePost.synopsis}
            </Text>
          </Box>
          <AnimeContent animePost={animePost} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default withApollo({ ssr: false })(CreatePost);
