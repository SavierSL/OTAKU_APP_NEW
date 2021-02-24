import {
  useMeQuery,
  useCommentPostMutation,
  useDeleteCommentMutation,
  useGetAnimePostCommentQuery,
  useUpdateCommentMutation,
  CommentPostMutation,
  PaginatedAnimePosts,
  CommentPostDocument,
  AnimePostDocument,
  GetAnimePostCommentDocument,
  GetAnimePostCommentQuery,
} from "../generated/graphql";
import { Flex, Image, Text, Link, Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { withApollo } from "../utils/withApollo";
import { Comment } from "../generated/graphql";
import { Form, Formik } from "formik";
import InputField from "../components/inputField";
import CommentContainer from "../components/commentContainer";
import { ApolloCache, gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

export interface CommentsProps {
  animePostId: number;
}

const Comments: React.FC<CommentsProps> = ({ animePostId }) => {
  const apolloClient = useApolloClient();
  const [commetPost] = useCommentPostMutation();
  const { data, loading, fetchMore } = useGetAnimePostCommentQuery({
    variables: { animePostId: animePostId },
  });

  const [openComment, setOpentComment] = useState(false);
  const [commented, setCommented] = useState(false);
  // const getComments = async (animePostId: number) => {
  //   const res = await comments({ variables: { animePostId: animePostId } });
  //   setAnimeComments(res.data.getAnimePostComment);
  // };
  if (!loading && !data) {
    return <div>You have no post </div>;
  }
  console.log(data);
  return (
    <>
      {!data && loading ? (
        <></>
      ) : (
        <>
          <Box width="100%" pl="4rem" pr="4rem">
            <Box w="7rem">
              <Text
                onClick={() => setOpentComment(!openComment)}
                mb="1rem"
                cursor="pointer"
                color="#fff"
              >
                Comments {data?.getAnimePostComment?.allComments.length}
              </Text>
            </Box>

            {openComment ? (
              <Box height="80%">
                {data!.getAnimePostComment?.allComments.map(
                  (comment: Comment) => {
                    return (
                      <>
                        <CommentContainer
                          comment={comment}
                          setCommented={setCommented}
                          commented={commented}
                        />
                      </>
                    );
                  }
                )}
              </Box>
            ) : (
              ""
            )}
            <Formik
              initialValues={{ comment: "" }}
              onSubmit={async ({ comment }, { resetForm }) => {
                commetPost({
                  variables: { animePostId, comment },
                  // update: (cache, { data }) => {
                  //   const cacheId = cache.identify(data.commentPost);
                  //   cache.modify({
                  //     fields: {
                  //       getAnimePostComment: (existingFieldData, { toReference }) => {
                  //         return [...existingFieldData, toReference(cacheId)];
                  //       },
                  //     },
                  //   });
                  // },

                  refetchQueries: [
                    {
                      query: GetAnimePostCommentDocument,
                      variables: {
                        animePostId,
                      },
                    },
                  ],
                  // update: (cache, { data }) => {
                  //   cache.modify({
                  //     id: cache.identify(Comment),
                  //   });
                  //   const query = cache.readQuery<GetAnimePostCommentQuery>({
                  //     query: GetAnimePostCommentDocument,

                  //     variables: {
                  //       animePostId,
                  //     },
                  //   });

                  //   cache.writeQuery({
                  //     query,
                  //     data: {
                  //       __typename: "Query",
                  //       getAnimePostComment: {
                  //         __typename: "PaginatedAnimeComments",
                  //         hasMore: true,
                  //         allComments: [
                  //           ...query.getAnimePostComment.allComments,
                  //           data!.commentPost,
                  //         ],
                  //       },
                  //     },
                  //   });
                  // },
                  // update: (cache, { data }) => {
                  //   const commentData = cache.readQuery<GetAnimePostCommentQuery>(
                  //     {
                  //       query: GetAnimePostCommentDocument,
                  //     }
                  //   );
                  //   const newData = cache.writeQuery<GetAnimePostCommentQuery>({
                  //     query: GetAnimePostCommentDocument,

                  //     data: {
                  //       __typename: "Query",
                  //       getAnimePostComment: {
                  //         __typename: "PaginatedAnimeComments",
                  //         hasMore: true,
                  //         allComments: [
                  //           ...commentData.getAnimePostComment.allComments,
                  //           data.commentPost,
                  //         ],
                  //       },
                  //     },
                  //   });
                  //   console.log(newData);
                  // },
                });

                setCommented(!commented);
                resetForm({ values: { comment: "" } }); //to reset form

                return;
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Box p=".5rem" pb="2rem" mt="-1rem">
                    <InputField
                      name="comment"
                      placeholder="comment"
                      type="text"
                    />
                    <Button type="submit" isLoading={isSubmitting}>
                      comment
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </>
      )}
    </>
  );
};

export default withApollo({ ssr: true })(Comments);
