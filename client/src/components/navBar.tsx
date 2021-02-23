import React from "react";
import { Flex, Image, Text, Link, Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({ skip: isServer() });
  let body: any;
  if (!data?.me && !loading) {
    body = (
      <Flex>
        <NextLink href="/anime">
          <Link>ANIMES</Link>
        </NextLink>
      </Flex>
    );
  }
  if (data?.me && !loading) {
    body = (
      <Flex>
        <NextLink href="/home">
          <Link>HOME</Link>
        </NextLink>
        <NextLink href="profile">
          <Link>PROFILE</Link>
        </NextLink>
        <NextLink href="/anime">
          <Link>ANIMES</Link>
        </NextLink>
        <Button
          onClick={async () => {
            await logout();
            router.push("/");
            apolloClient.resetStore();
          }}
        >
          Log out
        </Button>
      </Flex>
    );
  }
  return (
    <>
      <Flex justifyContent="space-between">
        <Text>Taku.</Text>
        {body}
      </Flex>
    </>
  );
};

export default NavBar;
