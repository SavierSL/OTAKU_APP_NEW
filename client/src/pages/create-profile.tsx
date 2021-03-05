import { Box, Button, Text, Link, Flex, Image, chakra } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import InputField from "../components/inputField";
import Wrapper from "../components/wrapper";
import CreatePost, { Anime, getAnime } from "../pages/create-post";
import {
  useAddFavAnimeMutation,
  useMeQuery,
  useGetFavAnimesQuery,
  GetFavAnimesDocument,
  useRemoveFavAnimeMutation,
  useGetProfileQuery,
  GetProfileDocument,
  useUpdateProfileMutation,
  useCreateProfileMutation,
} from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import Layout from "../components/layout";
import { motion } from "framer-motion";

export interface CreateProfileProps {}
const MotionBox = chakra(motion.div);

const profileIntro = {
  initial: {
    x: -100,
  },
  animate: {
    x: 0,
    transition: {
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 1,
    },
  },
};

const CreateProfile: React.FC<CreateProfileProps> = () => {
  const { data: ProfileData } = useGetProfileQuery();
  const { data: MeData } = useMeQuery();
  const { data: favAniemsData, loading } = useGetFavAnimesQuery({
    variables: { id: MeData.me.id },
  });
  const [removeFavAnime] = useRemoveFavAnimeMutation();
  const [createProfile] = useCreateProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [addFavAnime, { data }] = useAddFavAnimeMutation();
  const [animes, setAnimes] = useState([]);
  console.log(favAniemsData?.getFavAnimes.favAnimeList);
  console.log(ProfileData);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Layout>
        <Box height="100%">
          <Flex
            justifyContent="center"
            height="100%"
            p="5rem"
            flexDirection={{ sm: "column", md: "row" }}
          >
            <Box
              p={{ sm: "0", md: "2rem" }}
              width={{ sm: "100%", md: "100%" }}
              height="100%"
            >
              <Text color="white">Fave Animes</Text>
              {!favAniemsData && loading
                ? " "
                : favAniemsData.getFavAnimes.favAnimeList.map((anime) => {
                    return (
                      <Flex
                        key={anime.id}
                        borderRadius="1rem"
                        bg="blackAlpha.300"
                        p=".5rem 1.5rem .5rem 1rem"
                        mt="1rem"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                      >
                        <Text color="white">{anime.title}</Text>
                        <Text
                          onClick={() => {
                            removeFavAnime({
                              variables: { id: anime.id },
                              update: (cache) => {
                                cache.evict({
                                  id: "Anime:" + anime.id,
                                });
                              },
                            });
                          }}
                          cursor="pointer"
                          color="red"
                          fontSize="1rem"
                        >
                          Del
                        </Text>
                      </Flex>
                    );
                  })}
              <Formik
                initialValues={{ title: "" }}
                onSubmit={async (values, { resetForm }) => {
                  const data = await getAnime(values.title);
                  setAnimes(data.slice(0, 2));
                  resetForm({ values: { title: "" } });
                  console.log(data);
                  return data;
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField
                      name="title"
                      type="text"
                      placeholder="Add your fav animes"
                      label="title"
                    />

                    <Button type="submit" isLoading={isSubmitting} mt="1rem">
                      Search
                    </Button>
                  </Form>
                )}
              </Formik>
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
                            onClick={async () => {
                              await addFavAnime({
                                variables: {
                                  title: anime.title,
                                  rated: anime.rated,
                                  score: parseInt(anime.score),
                                  image_url: anime.image_url,
                                  synopsis: anime.synopsis,
                                },
                                //we neeed to refetch the queries so we can see it in the same window
                                //in create post it is different we just need to evict bc it changes to another winow so it can do a query again
                                //this one is DIFERENT we really need to refetch the data or rewrite the data
                                //we also dont need the help in the apollo bc we are not using a load more function not like in the post
                                refetchQueries: [
                                  { query: GetFavAnimesDocument },
                                ],
                              });
                            }}
                          >
                            ADD ANIME
                          </Button>
                        </Wrapper>
                      </Box>
                    );
                  })
                : ""}
            </Box>

            <Box width="100%" mt="2.5rem">
              <Formik
                initialValues={{
                  bio: ProfileData ? ProfileData?.getProfile?.bio : "",
                  age: ProfileData ? ProfileData?.getProfile?.age : "",
                  country: ProfileData ? ProfileData?.getProfile?.country : "",
                  mostFavouriteCharacter: ProfileData
                    ? ProfileData?.getProfile?.mostFavouriteCharacter
                    : "",
                }}
                onSubmit={({ bio, age, country, mostFavouriteCharacter }) => {
                  ProfileData?.getProfile
                    ? updateProfile({
                        variables: {
                          id: ProfileData.getProfile.id,
                          bio,
                          age,
                          country,
                          mostFavouriteCharacter,
                        },
                        refetchQueries: [{ query: GetProfileDocument }],
                      })
                    : createProfile({
                        variables: {
                          bio,
                          age,
                          country,
                          mostFavouriteCharacter,
                        },
                        refetchQueries: [{ query: GetProfileDocument }],
                      });
                }}
              >
                {({}) => (
                  <Form>
                    <MotionBox
                      animate={{
                        transition: {
                          staggerChildren: 1,
                        },
                      }}
                      width="100%"
                    >
                      <MotionBox
                        variants={profileIntro}
                        animate="animate"
                        initial="initial"
                      >
                        <InputField
                          name="bio"
                          label="Bio"
                          type="text"
                          placeholder="Bio"
                        />
                      </MotionBox>
                      <MotionBox
                        variants={profileIntro}
                        animate="animate"
                        initial="initial"
                      >
                        <InputField
                          name="age"
                          label="Age"
                          type="text"
                          placeholder="Age"
                        />
                      </MotionBox>
                      <MotionBox
                        variants={profileIntro}
                        animate="animate"
                        initial="initial"
                      >
                        <InputField
                          name="country"
                          label="Country"
                          type="text"
                          placeholder="Country"
                        />
                      </MotionBox>
                      <MotionBox
                        variants={profileIntro}
                        animate="animate"
                        initial="initial"
                      >
                        <InputField
                          name="mostFavouriteCharacter"
                          label="Most fav anime character"
                          type="text"
                          placeholder="Most fav anime character"
                        />
                      </MotionBox>
                      <MotionBox
                        variants={profileIntro}
                        animate="animate"
                        initial="initial"
                      >
                        <Button type="submit" width="100%" mt="2rem">
                          {ProfileData?.getProfile
                            ? "Update Profile"
                            : "Create Profile"}
                        </Button>
                      </MotionBox>
                    </MotionBox>
                  </Form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </motion.div>
  );
};

export default withApollo({ ssr: true })(CreateProfile);
