import { useRouter } from "next/router";
import {
  useAnimePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { withApollo } from "../../../utils/withApollo";
import { Flex, Image, Text, Link, Box, Button } from "@chakra-ui/react";
import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../../components/inputField";

export interface EditPostProps {}

const EditPost: React.FC<EditPostProps> = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [updateAnimePost] = useUpdatePostMutation();
  const { data, loading } = useAnimePostQuery({ variables: { id: intId } });
  if (!data) {
    return <Text>No Post</Text>;
  }
  if (!data.animePost) {
    return <Text>Cannot find post</Text>;
  }
  return (
    <>
      <Formik
        initialValues={{ text: data.animePost.text }}
        onSubmit={async ({ text }) => {
          await updateAnimePost({
            variables: {
              text: text,
              id: intId,
              title: data.animePost.title,
            },
          });
          router.push("/home");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField textarea name="text" placeholder="Text" label="Text" />
            <Button type="submit" isLoading={isSubmitting}>
              Edit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(EditPost);
