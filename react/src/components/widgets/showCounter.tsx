import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../variants/globals";
import { isAuthContext } from "../../context/isAuth";
const ShowCount = ({ length }: { length: number }) => {
  const { isAuth } = useContext(isAuthContext);
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
        {isAuth ? length : 0}
      </motion.div>
    </AnimatePresence>
  );
};

export default ShowCount;
