import { Box, Button, Flex, Text, Image, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import InputField from "../components/inputField";
import Wrapper from "../components/wrapper";

export interface CreatePostProps {}
interface Anime {
  title: string;
  rated: string;
  synopsis: string;
  score: number;
  image_url: string;
}

const CreatePost: React.FC<CreatePostProps> = () => {
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
  useEffect(() => {
    console.log(animePost);
  }, [animePost]);
  return (
    <>
      Create Anime Post
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
              spacing="40px"
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
                            <Box height={55} ml={3} pr={3}>
                              <Image
                                src={anime.image_url}
                                height={55}
                                objectFit="cover"
                                position="relative"
                              />
                            </Box>
                          </Flex>
                          <Button
                            bg="azure"
                            onClick={() => {
                              console.log(anime);
                              setAnimePost({
                                title: anime.title,
                                image_url: anime.image_url,
                                rated: anime.rated,
                                score: anime.score,
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
      {/* <InputField
        textarea
        name="text"
        placeholder="Caption"
        label="Caption"
        type="text"
      /> */}
    </>
  );
};

export default CreatePost;
