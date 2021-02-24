import { Box, Button, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import InputField from "../components/inputField";
import NavBar from "../components/navBar";
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
      <NavBar />
      <Text color="white">Taku.</Text>
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
            <Box pt="10rem">
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
              <Button type="submit" isLoading={isSubmitting}>
                Log In
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(Index);
