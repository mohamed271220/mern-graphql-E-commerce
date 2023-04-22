import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../variants/globals";
const ShowCount = ({ length }: { length: number }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={length}
        className="show-count center"
        variants={opacityVariant}
        transition={{ duration: 0.2 }}
        initial="start"
        animate="end"
        exit="exit"
      >
        {length}
      </motion.div>
    </AnimatePresence>
  );
};

export default ShowCount;
