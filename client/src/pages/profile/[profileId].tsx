import { useRouter } from "next/router";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import {
  useGetFavAnimesQuery,
  useGetProfilevQuery,
  useMeQuery,
  useGetProfilePostsQuery,
} from "../../generated/graphql";
import AnimePostContainer from "../../components/animeContainerPost";
import Layout from "../../components/layout";
import Wrapper from "../../components/wrapper";
import { withApollo } from "../../utils/withApollo";
export interface ProfileIdProps {}

const ProfileId: React.FC<ProfileIdProps> = () => {
  const router = useRouter();
  const { data: favAniemsData, loading } = useGetFavAnimesQuery();
  const { data: ProfileData } = useGetProfilevQuery({
    variables: {
      id:
        typeof router.query.profileId === "string"
          ? parseInt(router.query.profileId)
          : -1,
    },
  });
  const { data: MeData, loading: MeLoading } = useMeQuery();
  const {
    data: profilePostsData,
    fetchMore,
    variables,
  } = useGetProfilePostsQuery({
    variables: {
      limit: 2,
      cursor: "", // cannot be null
    },
  });

  console.log(ProfileData);
  console.log(profilePostsData?.getProfilePosts.animes);
  console.log(favAniemsData);
  //LETS JUST MAKE ANOTHER MUTATION
  return (
    <>
      <Layout>
        <Box pt="7rem">
          <Flex flexDirection="row" justifyContent="center">
            <Box p="1rem" width="25rem">
              <Box position="fixed">
                <Box>
                  <Text fontSize="2rem" color="white">
                    {MeData?.me.username}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="1rem" color="white">
                    {ProfileData?.getProfilev.bio}
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box>
              <Wrapper variant="regular">
                <Text color="white">Timeline</Text>
                {profilePostsData?.getProfilePosts.animes.map((anime) => {
                  return <AnimePostContainer anime={anime} />;
                })}
              </Wrapper>
              <Button
                onClick={() => {
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      cursor:
                        profilePostsData.getProfilePosts.animes[
                          profilePostsData.getProfilePosts.animes.length - 1
                        ].createdAt,
                    },
                  });
                  console.log(profilePostsData);
                }}
              >
                Load More
              </Button>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </>
  );
};

export default withApollo({ ssr: true })(ProfileId);
