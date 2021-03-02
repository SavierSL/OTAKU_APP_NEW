import { Box } from "@chakra-ui/react";
import React from "react";
import AnimePostContainer from "../components/animeContainerPost";
import Layout from "../components/layout";
import Wrapper from "../components/wrapper";
import {
  useGetFavAnimesQuery,
  useGetProfileQuery,
  useMeQuery,
} from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

export interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { data: favAniemsData, loading } = useGetFavAnimesQuery();
  const { data: ProfileData } = useGetProfileQuery();
  const { data: MeData, loading: MeLoading } = useMeQuery();

  console.log(ProfileData);
  console.log(MeData);
  console.log(favAniemsData);
  //LETS JUST MAKE ANOTHER MUTATION
  return (
    <>
      <Layout>
        <Box pt="5rem" bg="red">
          Profile
        </Box>
        <Wrapper variant="regular">
          {MeData?.me.animePost.map((anime) => {
            return <AnimePostContainer anime={anime} />;
          })}
        </Wrapper>
      </Layout>
    </>
  );
};

export default withApollo({ ssr: true })(Profile);
