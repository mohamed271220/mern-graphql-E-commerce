import React from "react";
import { AnimatePresence, motion } from "framer-motion";
interface Props {
  bool: boolean;
  title: string;
  dir?: string;
}
const Title = ({ title, bool, dir }: Props) => {
  const variant = {
    start: { opacity: 0, y: 10 },
    end: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.6, opacity: { delay: 0.2 } },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {bool && (
        <motion.div
          variants={variant}
          key={title}
          initial="start"
          exit={"exit"}
          animate="end"
          className={`custom-title ${dir === "left" ? "left" : "right"}`}
        >
          {" "}
          {title}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Title;
