import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";

export const MotionBox = chakra(motion.div);
export const homeIntro = {
  initial: {
    x: -100,
  },
  animate: {
    x: 0,
    transition: {
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
