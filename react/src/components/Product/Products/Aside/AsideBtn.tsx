import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { btnHover, btnTap, opacityVariant } from "../../../../variants/globals";

interface Props {
  startFiltering: boolean;
  fn: () => void;
  btn: string;
  cls: string;
}
const AsideBtn = ({ startFiltering, fn, btn, cls }: Props) => {
  return (
    <AnimatePresence>
      {startFiltering && (
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
          {btn}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default AsideBtn;
