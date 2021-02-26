import { Box, Button, Text, Link, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import InputField from "../components/inputField";
import NextLink from "next/link";
import NavBar from "../components/navBar";
import Wrapper from "../components/wrapper";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/isAuth";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

export interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const router = useRouter(); //NextJS property
  const [login] = useLoginMutation();
  const { data: MeData, loading: MeLoading } = useMeQuery();

  //there is no data and not loading
  if (MeData?.me) {
    // if it failed this next query will be added and the router.pathname, it is depend on the url 'dynamic'
    // we are telling if where ti should go after it logged in
    // this will become /login?next=/create-post. if logged in will go to create-post
    router.push("/home");
  }

  return (
    <>
      <Box height="100vh">
        <Wrapper variant="regular">
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const res = await login({
                variables: { ...values },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data.login.user,
                    },
                  });
                },
              });
              if (res.data?.login.errors) {
                //this can be undefined
                //if there is error
                //[{field: 'username',message:'somethingwrong'}]
                setErrors(toErrorMap(res.data.login.errors));
              } else if (res.data?.login.user) {
                router.push("/home");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box
                  textAlign="center"
                  bg="#1d1b38"
                  pt="2rem"
                  pr="4rem"
                  pb="7rem"
                  pl="4rem"
                  width="100%"
                  height="100%"
                  borderRadius="5px"
                >
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    flexDirection={{ sm: "column", md: "row" }}
                  >
                    <Text fontSize="3rem" fontWeight="700" color="#fff">
                      Log In to
                    </Text>
                    <Text
                      ml="1rem"
                      fontSize="3rem"
                      fontWeight="700"
                      color="#f05454"
                    >
                      Taku.
                    </Text>
                  </Flex>
                  <InputField
                    name="usernameOrEmail"
                    label="Username or Email"
                    type="text"
                    placeholder="username or email"
                  />
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                  />
                  <Button
                    mt="2rem"
                    width="100%"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Log In
                  </Button>
                  <Box mt="2rem">
                    <Text color="white">
                      You don't have an account?
                      <NextLink href="/register">
                        <Link color="lightblue">Register</Link>
                      </NextLink>
                    </Text>
                  </Box>

                  <Text
                    fontSize="1rem"
                    fontWeight="700"
                    color="#f05454"
                    mb="-2rem"
                    mt="2rem"
                  >
                    For otaku people
                  </Text>
                </Box>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </Box>
    </>
  );
};

export default withApollo({ ssr: false })(Index);
