import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import React from "react";
import { Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Box bg="#1e212d" height="100%" width="100%" pb="3rem">
            <Component {...pageProps} />
          </Box>
        </ColorModeProvider>
      </ChakraProvider>
    </AnimatePresence>
  );
}

export default MyApp;
