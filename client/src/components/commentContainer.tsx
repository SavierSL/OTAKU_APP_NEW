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
        <Text color="white">{comment.comment}</Text>
        <Text color="white">{comment.commentor.username}</Text>
        {MeData.me.id === comment.commentor.id ? (
          <>
            <Button onClick={() => setOpenEdit(!openEdit)}>Edit</Button>
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
                  update: (cache) => {
                    //we are just going to delete it laso in the cache
                    cache.evict({ id: "Comment:" + comment.id });
                  },
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
};

export default CommentContainer;
