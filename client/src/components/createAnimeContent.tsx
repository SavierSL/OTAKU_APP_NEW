import { MutationFunctionOptions } from "@apollo/client";
import { Box, Button, Flex, Text, Image, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  CreateAnimePostMutation,
  Exact,
  useCreateAnimePostMutation,
} from "../generated/graphql";
import { Anime } from "../pages/create-post";
import { withApollo } from "../utils/withApollo";
import InputField from "./inputField";
export interface AnimeContentProps {
  animePost: Anime;
}

const AnimeContent: React.FC<AnimeContentProps> = ({ animePost }) => {
  const [createAnimePost] = useCreateAnimePostMutation();
  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={async ({ text }) => {
        createAnimePost({
          variables: { text, ...animePost },
          //to see a new post we need to evict it
          update: (cache) => {
            console.log(cache);
            cache.evict({ fieldName: "animePosts" });
            cache.evict({ fieldName: "getProfilePosts" });
          },
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            textarea
            name="text"
            placeholder="Caption"
            label="Your Caption"
          />

          <Button type="submit" isLoading={isSubmitting}>
            Post
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(AnimeContent);
