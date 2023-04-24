import React from "react";
import { motion } from "framer-motion";
import { overleyVariant, popVariant } from "../../variants/globals";
import { ChildrenInterFace } from "../../interfaces/general";
interface Props extends ChildrenInterFace {
  sethide: React.Dispatch<React.SetStateAction<boolean>>;
  cls: string;
  dir?: string;
  height?: number;
}
const Overley = ({ sethide, cls, children, dir = "top", height }: Props) => {
  const handlehidePop = () => {
    sethide(false);
  };
  return (
    <motion.div
      className="overley center"
      variants={overleyVariant}
      initial="start"
      exit="exit"
      animate="end"
      onClick={handlehidePop}
      key={"overley"}
    >
      <motion.section
        className={cls}
        variants={popVariant}
        custom={{ dir: dir || "top", height }}
        key={"overley-pop"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </motion.section>
    </motion.div>
  );
};

export default Overley;
