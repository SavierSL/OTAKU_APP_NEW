import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import React from "react";
import { Box } from "@chakra-ui/react";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Box bg="#1e212d">
          <Component {...pageProps} />
        </Box>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
