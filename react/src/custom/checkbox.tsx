import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const checkSvgVariant = {
    start: { opacity: 0 },
    end: {
      opacity: 1,
      transition: {
        opacity: { when: "beforeChildren", duration: 0.4 },
      },
    },
    exit: { opacity: 0, transition: { when: "afterChildren", duration: 0.8 } },
  };

  const checkpathVariant = {
    start: { pathLength: 0, pathOffset: 1 },
    end: { pathLength: 1, pathOffset: 0, transition: { duration: 0.4 } },
    exit: { pathLength: 0, pathOffset: 1, transition: { duration: 0.4 } },
  };

  const parentVarient = {
    start: {},
    end: (bool: boolean) => ({
      rotate: bool ? [0, 15, -15, 0] : "",
      transition: {
        rotate: { delay: 0, when: "beforeChildren", duration: 0.2 },
      },
    }),
    exit: { transition: { when: "afterChildren", duration: 0.2 } },
  };
  return (
    <motion.div
      className="custom-check-parent center"
      variants={parentVarient}
      initial="start"
      animate="end"
      exit={"exit"}
      custom={isChecked}
      style={{ marginTop: 200, marginLeft: 40 }}
      onClick={() => setIsChecked(!isChecked)}
    >
      <AnimatePresence mode="wait">
        {isChecked && (
          <motion.svg
            viewBox="0 0 24 24"
            width="12px"
            height="12px"
            className="center custom-check"
            variants={checkSvgVariant}
            initial="start"
            animate="end"
            exit={"exit"}
          >
            <motion.path
              fill="none"
              stroke="#000"
              strokeMiterlimit="10"
              strokeWidth="3"
              d="M21 6L9 18 4 13"
              variants={checkpathVariant}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Checkbox;
