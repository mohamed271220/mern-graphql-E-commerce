import React from "react";
import { ChildrenInterFace } from "../../interfaces/general";
import { motion } from "framer-motion";
import useIsMobile from "../../custom/useIsMobile";
interface Props extends ChildrenInterFace {
  addIntialX?: boolean;
}
const Animation = ({ children, addIntialX = true }: Props) => {
  const variant = {
    start: { x: addIntialX ? -100 : 0, opacity: 0, y: 0 },
    end: { x: 0, opacity: 1, y: 0 },
    exit: {
      x: 100,
      opacity: 0,
    },
  };
  return (
    <motion.div
      variants={variant}
      initial="start"
      animate="end"
      exit={"exit"}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Animation;
