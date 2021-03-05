import { Box } from "@chakra-ui/react";
import React from "react";

export interface WrapperProps {
  variant: "esmall" | "small" | "regular" | "large";
}

const Wrapper: React.FC<WrapperProps> = ({ variant = "regular", children }) => {
  let size: any = "";
  if (variant === "esmall") {
    size = 300;
  } else if (variant === "small") {
    size = 400;
  } else if (variant === "large") {
    size = 1000;
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
