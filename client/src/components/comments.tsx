import { useGetAnimePostCommentMutation } from "../generated/graphql";
import { Flex, Image, Text, Link, Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { withApollo } from "../utils/withApollo";
export interface CommentsProps {
  animePostId: number;
}

const Comments: React.FC<CommentsProps> = ({ animePostId }) => {
  const [comments, { loading }] = useGetAnimePostCommentMutation();
  const [animeComments, setAnimeComments] = useState([]);
  const getComments = async (animePostId: number) => {
    const res = await comments({ variables: { animePostId: animePostId } });
    setAnimeComments(res.data.getAnimePostComment);
  };
  getComments(animePostId);

  return (
    <>
      <Text>Comments {animeComments.length}</Text>
    </>
  );
};

export default withApollo({ ssr: true })(Comments);
