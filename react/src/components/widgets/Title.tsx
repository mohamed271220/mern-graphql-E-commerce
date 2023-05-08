import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import useShowTitle from "../../custom/useShowTitle";
import { ChildrenInterFace } from "../../interfaces/general";
interface Props extends ChildrenInterFace {
  title: string;
  dir?: string;
  abs?: boolean;
}
const Title = ({ title, dir, children, abs }: Props) => {
  const variant = {
    start: { opacity: 0, y: 10 },
    end: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2, opacity: { delay: 0.2 } },
    },
  };

  const [bool, show, hide] = useShowTitle();

  return (
    <motion.span
      className={`title-par ${abs ? "" : "relative"}`}
      onHoverStart={show}
      onHoverEnd={hide}
      onTapStart={hide}
    >
      {children}
      <AnimatePresence mode="wait">
        {bool && title !== "" && (
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
    </motion.span>
  );
};

export default Title;
