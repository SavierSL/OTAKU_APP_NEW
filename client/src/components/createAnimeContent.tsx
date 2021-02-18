import { Box, Button, Flex, Text, Image, SimpleGrid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "./inputField";
export interface AnimeContentProps {}

const AnimeContent: React.FC<AnimeContentProps> = () => {
  return (
    <Formik initialValues={{ title: "" }} onSubmit={async (values) => {}}>
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

export default AnimeContent;
