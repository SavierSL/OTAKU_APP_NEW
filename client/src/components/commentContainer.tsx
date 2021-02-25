import {
  useMeQuery,
  useCommentPostMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../generated/graphql";
import { Flex, Image, Text, Link, Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { withApollo } from "../utils/withApollo";
import { Comment } from "../generated/graphql";
import { Form, Formik } from "formik";
import InputField from "../components/inputField";

export interface CommentProps {
  comment: Comment;
  setCommented: React.Dispatch<React.SetStateAction<boolean>>;
  commented: boolean;
}
const CommentContainer: React.FC<CommentProps> = ({ comment }) => {
  const { data: MeData, loading: MeLoading } = useMeQuery();
  const [commetPost] = useCommentPostMutation();

  const [
    deleteComment,
    { loading: deleteLoading },
  ] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const [openEdit, setOpenEdit] = useState(false);

  const [commented, setCommented] = useState(false);

  return (
    <>
      <Box mt="2rem">
        <Box
          bg="blackAlpha.500"
          width="90%"
          borderRadius="1rem"
          p=".5rem 0rem .5rem 1rem"
        >
          <Text color="white">{comment.commentor.username}</Text>
          {openEdit ? "" : <Text color="white">{comment.comment}</Text>}
          {MeData.me.id === comment.commentor.id ? (
            <Flex flexDirection="column" justifyContent="center">
              {openEdit ? (
                <Formik
                  initialValues={{ newComment: `${comment.comment}` }}
                  onSubmit={({ newComment }, { resetForm }) => {
                    updateComment({
                      variables: {
                        comment: newComment,
                        id: comment.id,
                      },
                    });
                    setCommented(!commented);
                    setOpenEdit(!openEdit);
                    resetForm({ values: { newComment: "" } });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Box p="0 1rem .5rem 0">
                        <InputField
                          name="newComment"
                          type="text"
                          placeholder="edit comment"
                        />
                      </Box>
                    </Form>
                  )}
                </Formik>
              ) : (
                ""
              )}
              <Flex>
                <Text
                  fontSize="12px"
                  color="green"
                  cursor="pointer"
                  onClick={() => setOpenEdit(!openEdit)}
                >
                  Edit
                </Text>
                <Text
                  ml="2rem"
                  fontSize="12px"
                  cursor="pointer"
                  color="red"
                  onClick={async () => {
                    await deleteComment({
                      variables: { id: comment.id },
                      update: (cache) => {
                        //we are just going to delete it laso in the cache
                        cache.evict({ id: "Comment:" + comment.id });
                      },
                    });
                    setCommented(!commented);
                  }}
                >
                  Delete
                </Text>
              </Flex>
            </Flex>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default CommentContainer;
