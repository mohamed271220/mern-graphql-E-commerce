import React from "react";
import { motion } from "framer-motion";

const Transition = () => {
  const clrArr = [
    { clr: "var(--clr-banner)", z: 130 },
    { clr: "var(--wheat-title)", z: 120 },
    { clr: "var(--green)", z: 110 },
  ];

  const mainVariant = {
    start: {
      x: "100%",
      width: "100%",
    },
    end: (ind: number) => ({
      x: "0%",
      width: "0%",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: ind * 0.2,
      },
    }),
    exit: {
      width: ["0%", "100%"],
      x: ["0%", "100%"],
      transition: { duration: 0.8 },
    },
  };

  return (
    <>
      {/* <AnimatePresence mode="wait"> */}
      {clrArr.map(({ clr, z }, i) => {
        return (
          <motion.div
            variants={mainVariant}
            initial="start"
            animate="end"
            exit={i === 0 ? "exit" : ""}
            key={clr}
            custom={i}
            style={{
              background: clr,
              zIndex: z,
              right: "100%",
            }}
            className="transirion-div"
          ></motion.div>
        );
      })}
      {/* </AnimatePresence> */}
    </>
  );
};

export default Transition;
