import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  FormHelperText,
  Button,
  Image,
  Box,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { animate } from "framer-motion";
import React, { useEffect } from "react";
import { useState } from "react";
import Wrapper from "../components/wrapper";

export interface HomeProps {}

const SearchAnime: React.FC<HomeProps> = () => {
  const [animes, setAnimes] = useState([]);
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
    console.log(animes);
  }, [animes]);

  return (
    <>
      <Wrapper variant="small">
        <Formik
          initialValues={{ title: "" }}
          onSubmit={async (values) => {
            const data = await getAnime(values.title);
            setAnimes(data.slice(0, 8));
            console.log(animes);
            return data;
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mt={4}
                p={2}
              >
                <FormControl id="title">
                  <FormLabel htmlFor="title">Search</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Anime title"
                    value={values.title}
                    onChange={handleChange}
                  />
                  <FormHelperText>IKUZO</FormHelperText>
                </FormControl>
                <Button type="submit" isLoading={isSubmitting} ml={4}>
                  Search
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
      {animes.length !== 0
        ? animes.map((anime) => {
            return (
              <>
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
                      <Box width={60} ml={3} pr={3}>
                        <Image
                          src={anime.image_url}
                          width="100%"
                          objectFit="cover"
                          position="relative"
                        />
                      </Box>
                    </Flex>
                    <Button bg="azure">ADD TO MY FAV</Button>
                    <Button bg="bisque">VISIT</Button>
                  </Wrapper>
                </Box>
              </>
            );
          })
        : ""}
    </>
  );
};

export default SearchAnime;
