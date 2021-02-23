import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import React from "react";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import InputField from "../components/inputField";
import { Button } from "@chakra-ui/react";
import { withApollo } from "../utils/withApollo";

export interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <>
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
            <InputField
              name="username"
              label="Username"
              type="text"
              placeholder="username"
            />
            <InputField
              name="email"
              label="Email"
              type="text"
              placeholder="email"
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              placeholder="password"
            />
            <Button type="submit" isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(Register);
