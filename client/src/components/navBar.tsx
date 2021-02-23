import React from "react";
import { Flex, Image, Text, Link, Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <>
      <Flex justifyContent="space-between">
        <Text>Taku.</Text>
        <Flex>
          <NextLink href="/">
            <Link>HOME</Link>
          </NextLink>
          <NextLink href="profile">
            <Link>PROFILE</Link>
          </NextLink>
          <NextLink href="/anime">
            <Link>ANIMES</Link>
          </NextLink>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
