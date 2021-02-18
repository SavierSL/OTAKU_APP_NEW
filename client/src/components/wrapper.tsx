import { Box } from "@chakra-ui/react";
import React from "react";

export interface WrapperProps {
  variant: "esmall" | "small" | "regular";
}

const Wrapper: React.FC<WrapperProps> = ({ variant = "regular", children }) => {
  let size: any = "";
  if (variant === "esmall") {
    size = 300;
  } else if (variant === "small") {
    size = 400;
  } else {
    size = 600;
  }
  return (
    <>
      <Box maxW={size} w="90%" mx="auto">
        {children}
      </Box> 
    </>
  );
};

export default Wrapper;
