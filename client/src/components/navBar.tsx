import React from "react";
import { Flex, Image, Text, Link, Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { withApollo } from "../utils/withApollo";

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
      <Flex alignItems="center" justifyContent="center" p="1rem" zIndex="1000">
        <Box>
          <NextLink href="/home">
            <Link
              mr="1rem"
              fontSize={{ sm: "10px", md: "12px" }}
              color="#f7f6e7"
            >
              HOME
            </Link>
          </NextLink>
        </Box>
        <Box>
          <NextLink href="/profile/[profileId]" as={`/profile/${data.me.id}`}>
            <Link
              mr="1rem"
              fontSize={{ sm: "10px", md: "12px" }}
              color="#f7f6e7"
            >
              PROFILE
            </Link>
          </NextLink>
        </Box>
        <Box>
          <NextLink href="/anime">
            <Link
              mr="1rem"
              fontSize={{ sm: "10px", md: "12px" }}
              color="#f7f6e7"
            >
              ANIMES
            </Link>
          </NextLink>
        </Box>
        <Box>
          <Button
            mr="-.5rem"
            fontSize={{ sm: "10px", md: "12px" }}
            onClick={async () => {
              await logout();
              router.push("/");
              apolloClient.resetStore();
            }}
            bg="#f2a154"
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
    <Flex position="fixed" zIndex="1000">
      <Box p="1rem 0rem 0rem 3rem">
        <Text fontSize="2rem" pt=".5rem" color="#f2a154">
          Taku.
        </Text>
      </Box>
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        position="fixed"
        width="30%"
        right="0"
        zIndex="1000"
      >
        <Box p="1rem">{body}</Box>
      </Flex>
    </Flex>
  );
};

export default withApollo({ ssr: true })(NavBar);
