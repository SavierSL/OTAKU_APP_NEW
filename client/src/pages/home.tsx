import {
  Flex,
  Image,
  Text,
  Link,
  Box,
  Button,
  chakra,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import {
  useAnimePostsQuery,
  useDeletePostMutation,
  useGetFavAnimesQuery,
  useGetProfileQuery,
  useMeQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/isAuth";
import { withApollo } from "../utils/withApollo";
import NavBar from "../components/navBar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Comments from "../components/comments";
import EditAndDeletePost from "../components/EditAndDeletePost";
import Layout from "../components/layout";
import { motion } from "framer-motion";
import AnimePostContainer from "../components/animeContainerPost";

export interface IndexProps {}
const MotionBox = chakra(motion.div);

const Home: React.FC<IndexProps> = () => {
  const { isOpen, onToggle } = useDisclosure();
  const {
    data: favAniemsData,
    loading: favAnimeLoading,
  } = useGetFavAnimesQuery();
  const { data: ProfileData } = useGetProfileQuery();
  const router = useRouter();
  const { data: MeData, loading: MeLoading } = useMeQuery();
  const [deletePost, { loading: deleteLoading }] = useDeletePostMutation();
  const { data, loading, fetchMore, variables } = useAnimePostsQuery({
    variables: {
      limit: 2,
      cursor: "",
    },
  });
  const [topAnimeLists, setTopAnimeLists] = useState([]);
  const getTopAnimes = async () => {
    const topAnimes = await fetch(
      "https://jikan1.p.rapidapi.com/top/anime/1/upcoming",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "0a1e2916a5msh44da6893e3cecdbp108d8bjsne9ac3d4c9fd4",
          "x-rapidapi-host": "jikan1.p.rapidapi.com",
        },
      }
    );
    const res = await topAnimes.json();
    return res.top;
  };

  useEffect(() => {
    //there is no data and not loading
    if (!MeData?.me && !MeLoading) {
      // if it failed this next query will be added and the router.pathname, it is depend on the url 'dynamic'
      // we are telling if where ti should go after it logged in
      // this will become /login?next=/create-post. if logged in will go to create-post
      router.push("/");
    }
    const animeLists = getTopAnimes().then((res) => setTopAnimeLists(res));
  }, []);
  console.log(topAnimeLists);

  const homeIntro = {
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
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <MotionBox
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Layout>
        {MeData?.me ? (
          <>
            <Box
              display={{ sm: "block", md: "none" }}
              position="fixed"
              zIndex="1001"
              left="0"
              mt="5rem"
              width="100%"
              p="1rem"
            >
              <Button onClick={onToggle}>-</Button>
              <Collapse in={isOpen} animateOpacity>
                <Box
                  p="40px"
                  color="white"
                  mt="4"
                  width="100%"
                  height="100%"
                  bg="#1e212d"
                  rounded="md"
                  shadow="md"
                >
                  <Flex flexDirection="column">
                    <NextLink href="create-post">
                      <Link color="white">
                        <Button bg="#1e212d" _hover={{ bg: "teal.600" }}>
                          Create Post
                        </Button>
                      </Link>
                    </NextLink>

                    <NextLink href="create-profile">
                      <Link color="white">
                        <Button bg="#1e212d" _hover={{ bg: "teal.600" }}>
                          {ProfileData?.getProfile
                            ? "Update Profile"
                            : "Create Profile"}
                        </Button>
                      </Link>
                    </NextLink>
                  </Flex>
                </Box>
              </Collapse>
            </Box>
            <Flex>
              <MotionBox
                variants={homeIntro}
                animate="animate"
                initial="initial"
                w="20%"
                bg="#0f1123"
                height="100vh"
                position="fixed"
                pt="5rem"
                display={{ sm: "none", md: "block" }}
              >
                <Flex alignItems="flex-start" flexDirection="column" p="3rem">
                  <Text color="white">{MeData.me.username}</Text>
                  <Box mt="1rem" mb="1rem">
                    <Text fontWeight="700" color="#f2a154" mb=".5rem">
                      Fav Animes
                    </Text>
                    <Flex flexDirection="column">
                      {favAniemsData?.getFavAnimes.favAnimeList.length !== 0 ? (
                        favAniemsData?.getFavAnimes.favAnimeList
                          .slice(0, 5)
                          .map((anime) => {
                            return (
                              <Box>
                                <Text color="#f2a154" key={anime.id}>
                                  {anime.title}
                                </Text>
                              </Box>
                            );
                          })
                      ) : (
                        <Text color="#f2a154">none</Text>
                      )}
                    </Flex>
                  </Box>
                  <NextLink href="create-post">
                    <Link color="white">
                      <Button
                        mt="1rem"
                        width="12rem"
                        bg="#1e212d"
                        _hover={{ bg: "teal.600" }}
                      >
                        Create Post
                      </Button>
                    </Link>
                  </NextLink>
                  <NextLink href="create-profile">
                    <Link color="white">
                      <Button
                        mt="1rem"
                        width="12rem"
                        bg="#1e212d"
                        _hover={{ bg: "teal.600" }}
                      >
                        {ProfileData?.getProfile
                          ? "Update Profile"
                          : "Create Profile"}
                      </Button>
                    </Link>
                  </NextLink>
                </Flex>
              </MotionBox>

              <Box m="auto" pt={{ sm: "5rem", md: "0" }}>
                <Box
                  w={{ sm: "100%", md: "60%" }}
                  p={4}
                  ml={{ sm: "auto", md: "20%" }}
                  mr={{ sm: "auto", md: "10rem" }}
                >
                  {!data && loading ? (
                    <div></div>
                  ) : (
                    data!.animePosts.animes.map((anime) => {
                      return !anime && !MeData?.me ? null : (
                        <>
                          <AnimePostContainer anime={anime} />
                        </>
                      );
                    })
                  )}
                  {data?.animePosts.hasMore && data ? (
                    <Box mr="auto" ml="auto" textAlign="center" p="1rem">
                      <Button
                        bg="none"
                        color="#1687a7"
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
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
              <Box
                w="20%"
                bg="#0f1123"
                height="100vh"
                position="fixed"
                right="0"
                mt="6.5rem"
                display={{ sm: "none", md: "block" }}
                p="1rem"
                overflow="scroll"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#f2a154",
                    borderRadius: "24px",
                  },
                }}
              >
                <Box>
                  <Text color="#da723c">Top animes</Text>
                  <Flex flexDirection="column">
                    {topAnimeLists.length !== 0
                      ? topAnimeLists.slice(0, 50).map((anime) => {
                          return (
                            <Box
                              bg="#121013"
                              mb=".5rem"
                              p=".3rem"
                              borderRadius=".2rem"
                            >
                              <Text
                                fontWeight="600"
                                fontSize="12px"
                                color="#ffefa1"
                              >
                                {anime.title}
                              </Text>
                            </Box>
                          );
                        })
                      : ""}
                  </Flex>
                  <Text fontWeight="600" fontSize="16px" color="#ffefa1">
                    next
                  </Text>
                </Box>
              </Box>
            </Flex>
          </>
        ) : (
          ""
        )}
      </Layout>
    </MotionBox>
  );
};

export default withApollo({ ssr: true })(Home);
