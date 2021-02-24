import { Box } from "@chakra-ui/react";
import React from "react";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Box className="page-layout">{children}</Box>
    </>
  );
};

export default Layout;
