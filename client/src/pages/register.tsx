import { useRouter } from "next/router";
import { Box, Button, Text, Link, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import InputField from "../components/inputField";
import Wrapper from "../components/wrapper";
import NextLink from "next/link";
import { withApollo } from "../utils/withApollo";

export interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <>
      <Wrapper variant="regular">
        <Box height="100vh">
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const res = await register({ variables: { ...values } });
              if (res.data?.register.errors) {
                //this can be undefined
                //if there is error
                //[{field: 'username',message:'somethingwrong'}]
                setErrors(toErrorMap(res.data.register.errors));
              } else if (res.data?.register.user) {
                //worked
                if (typeof router.query.next === "string") {
                  router.push(router.query.next);
                } else {
                  router.push("/");
                }
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
                    alignItems="flex-end"
                    alignContent="center"
                  >
                    <Text fontSize="3rem" fontWeight="700" color="#fff">
                      Register to
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
                    name="email"
                    label="Email"
                    type="text"
                    placeholder="Email"
                  />
                  <InputField
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                  />
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                  />
                  <Button
                    mt="2rem"
                    width="100%"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Register
                  </Button>
                  <Box mt="2rem">
                    <Text color="white">
                      Already have an account?
                      <NextLink href="/">
                        <Link color="lightblue">Sign in</Link>
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
        </Box>
      </Wrapper>
    </>
  );
};

export default withApollo({ ssr: false })(Register);
