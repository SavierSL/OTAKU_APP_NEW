import { useRouter } from "next/router";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  useGetFavAnimesQuery,
  useGetProfilevQuery,
  useMevQuery,
  useGetProfilePostsQuery,
} from "../../generated/graphql";
import AnimePostContainer from "../../components/animeContainerPost";
import Layout from "../../components/layout";
import Wrapper from "../../components/wrapper";
import { withApollo } from "../../utils/withApollo";
import { MotionBox } from "../../components/motionComponents";
export interface ProfileIdProps {}

const ProfileId: React.FC<ProfileIdProps> = () => {
  const router = useRouter();
  const routerId =
    typeof router.query.profileId === "string"
      ? parseInt(router.query.profileId)
      : -1;
  const { data: favAniemsData, loading } = useGetFavAnimesQuery({
    variables: { id: routerId },
  });
  const { data: ProfileData } = useGetProfilevQuery({
    variables: {
      id:
        typeof router.query.profileId === "string"
          ? parseInt(router.query.profileId)
          : -1,
    },
  });
  const { data: MevData, loading: MeLoading } = useMevQuery({
    variables: { id: routerId },
  });
  const {
    data: profilePostsData,
    loading: profilePostsLoading,
    fetchMore,
    variables,
  } = useGetProfilePostsQuery({
    variables: {
      id: routerId,
      limit: 2,
      cursor: "", // cannot be null
    },
  });

  console.log(ProfileData);
  console.log(MevData);
  console.log(favAniemsData);
  //LETS JUST MAKE ANOTHER MUTATION

  return (
    <>
      <MotionBox
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Layout>
          {profilePostsLoading ? (
            ""
          ) : (
            <MotionBox
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              pt={{ sm: "5rem", md: "7rem" }}
            >
              <Wrapper variant="large">
                <Flex
                  flexDirection={{ sm: "column", md: "row" }}
                  justifyContent="center"
                >
                  <Box
                    p="1rem"
                    width={{ sm: "100%", md: "45%" }}
                    textAlign={{ sm: "center", md: "left" }}
                    ml="auto"
                    mr="auto"
                  >
                    <Box position={{ sm: "relative", md: "fixed" }}>
                      <Box>
                        <Text fontSize="2rem" color="white">
                          {MevData?.mev.username}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="1rem" color="white">
                          {ProfileData?.getProfilev?.bio}
                        </Text>
                        <Text fontSize="2rem" color="white">
                          Favourite Animes
                        </Text>
                        <Flex flexDirection="column">
                          {favAniemsData?.getFavAnimes.favAnimeList.length !==
                          0 ? (
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
                    </Box>
                  </Box>

                  <Box
                    pt={{ sm: "1rem", md: "0rem" }}
                    ml="auto"
                    mr="auto"
                    width="100%"
                  >
                    <Text color="white">Timeline</Text>
                    {profilePostsData?.getProfilePosts.animes.map((anime) => {
                      return <AnimePostContainer anime={anime} />;
                    })}

                    {profilePostsData?.getProfilePosts.hasMore ? (
                      <Box textAlign="center" p="1rem">
                        <Button
                          bg="none"
                          color="#1687a7"
                          onClick={() => {
                            fetchMore({
                              variables: {
                                id: variables.id,
                                limit: variables?.limit,
                                cursor:
                                  profilePostsData.getProfilePosts.animes[
                                    profilePostsData.getProfilePosts.animes
                                      .length - 1
                                  ].createdAt,
                              },
                            });
                            console.log(profilePostsData);
                          }}
                        >
                          Load More
                        </Button>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                </Flex>
              </Wrapper>
            </MotionBox>
          )}
        </Layout>
      </MotionBox>
    </>
  );
};

export default withApollo({ ssr: true })(ProfileId);
