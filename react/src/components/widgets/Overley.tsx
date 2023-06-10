import React from "react";
import { motion } from "framer-motion";
import {
  asideVariant,
  overleyVariant,
  popVariant,
} from "../../variants/globals";
import { ChildrenInterFace } from "../../interfaces/general";
import useIsMobile from "../../custom/useIsMobile";
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
  const { isMobile } = useIsMobile();

  return (
    <motion.div
      className="overley center"
      variants={isMobile ? overleyVariant : {}}
      initial="start"
      exit="exit"
      animate="end"
      onClick={handlehidePop}
      key={"overley"}
    >
      <motion.section
        className={cls}
        variants={isMobile ? asideVariant : popVariant}
        custom={isMobile ? isMobile : { dir: dir || "top", height }}
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
