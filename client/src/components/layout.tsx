import { Box } from "@chakra-ui/react";
import React from "react";
import NavBar from "./navBar";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box className="page-layout">{children}</Box>
    </>
  );
};

export default Layout;
