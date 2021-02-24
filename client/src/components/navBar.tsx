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
      <Flex alignItems="center" justifyContent="center" p=".5rem" zIndex="1000">
        <Box mr="2rem">
          <NextLink href="/home">
            <Link color="#f7f6e7">HOME</Link>
          </NextLink>
        </Box>
        <Box mr="2rem">
          <NextLink href="profile">
            <Link color="#f7f6e7">PROFILE</Link>
          </NextLink>
        </Box>
        <Box mr="2rem">
          <NextLink href="/anime">
            <Link color="#f7f6e7">ANIMES</Link>
          </NextLink>
        </Box>
        <Box mr="2rem">
          <Button
            onClick={async () => {
              await logout();
              router.push("/");
              apolloClient.resetStore();
            }}
            bg="#1e212d"
            color="white"
            _hover={{ bg: "teal.600" }}
          >
            Log out
          </Button>
        </Box>
      </Flex>
    );
  }
  return (
    <>
      <Flex
        justifyContent="space-between"
        bg="blackAlpha.500"
        alignItems="center"
        position="fixed"
        width="80%"
        right="0"
        zIndex="1000"
      >
        <Box p="1rem">
          <Text fontSize="2rem" color="#f2a154">
            Taku.
          </Text>
        </Box>

        <Box p="1rem">{body}</Box>
      </Flex>
    </>
  );
};

export default NavBar;
