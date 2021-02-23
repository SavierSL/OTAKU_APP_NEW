import {
  useMeQuery,
  useCommentPostMutation,
  useDeleteCommentMutation,
  useGetAnimePostCommentMutation,
  useUpdateCommentMutation,
} from "../generated/graphql";
import { Flex, Image, Text, Link, Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { withApollo } from "../utils/withApollo";
import { Comment } from "../generated/graphql";
import { Form, Formik } from "formik";
import InputField from "../components/inputField";

export interface CommentsProps {
  animePostId: number;
}

const Comments: React.FC<CommentsProps> = ({ animePostId }) => {
  const { data: MeData, loading: MeLoading } = useMeQuery();
  const [commetPost] = useCommentPostMutation();
  const [comments, { loading }] = useGetAnimePostCommentMutation();
  const [
    deleteComment,
    { loading: deleteLoading },
  ] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [openComment, setOpentComment] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [animeComments, setAnimeComments] = useState([]);
  const [commented, setCommented] = useState(false);
  const getComments = async (animePostId: number) => {
    const res = await comments({ variables: { animePostId: animePostId } });
    setAnimeComments(res.data.getAnimePostComment);
  };
  useEffect(() => {
    getComments(animePostId);
  }, [commented]);

  return (
    <>
      <Text onClick={() => setOpentComment(!openComment)}>
        Comments {animeComments.length}
      </Text>
      {openComment && animeComments.length !== 0 ? (
        <Box height="100%">
          {animeComments.map((comment: Comment) => {
            return (
              <>
                <Box mt="2rem">
                  <Text>{comment.comment}</Text>
                  <Text>{comment.commentor.username}</Text>
                  {MeData.me.id === comment.commentor.id ? (
                    <>
                      <Button onClick={() => setOpenEdit(!openEdit)}>
                        Edit
                      </Button>
                      {openEdit ? (
                        <Formik
                          initialValues={{ newComment: "" }}
                          onSubmit={({ newComment }, { resetForm }) => {
                            updateComment({
                              variables: {
                                comment: newComment,
                                id: comment.id,
                              },
                            });
                            setCommented(!commented);
                            resetForm({ values: { newComment: "" } });
                          }}
                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <InputField
                                name="newComment"
                                type="text"
                                placeholder="edit comment"
                              />
                              <Button type="submit" isLoading={isSubmitting}>
                                Edit
                              </Button>
                            </Form>
                          )}
                        </Formik>
                      ) : (
                        ""
                      )}
                      <Button
                        onClick={async () => {
                          await deleteComment({
                            variables: { id: comment.id },
                          });
                          setCommented(!commented);
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </Box>
              </>
            );
          })}
        </Box>
      ) : (
        ""
      )}
      <Formik
        initialValues={{ comment: "" }}
        onSubmit={async ({ comment }, { resetForm }) => {
          await commetPost({ variables: { animePostId, comment } });
          setCommented(!commented);
          resetForm({ values: { comment: "" } }); //to reset form

          return;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="comment" placeholder="comment" type="text" />
            <Button type="submit" isLoading={isSubmitting}>
              comment
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default withApollo({ ssr: true })(Comments);
