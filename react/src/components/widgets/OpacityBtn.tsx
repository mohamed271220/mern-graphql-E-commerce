import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { btnHover, btnTap, opacityVariant } from "../../variants/globals";

interface Props {
  fn: () => void;
  btn: string;
  cls: string;
  Icon?: React.ComponentType;
}
const OpacityBtn = ({ fn, btn, cls, Icon }: Props) => {
  return (
    <motion.button
      key={"apply-btn"}
      variants={opacityVariant}
      transition={{ duration: 0.4 }}
      initial="start"
      exit="exit"
      animate="end"
      whileHover={btnHover}
      whileTap={btnTap}
      className={cls}
      onClick={fn}
    >
      {Icon && <Icon />}
      {btn}
    </motion.button>
  );
};

export default OpacityBtn;
