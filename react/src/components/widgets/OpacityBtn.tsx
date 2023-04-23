import { motion } from "framer-motion";
import React from "react";
import { btnHover, btnTap, opacityVariant } from "../../variants/globals";
import useShowTitle from "../../custom/useShowTitle";
import Title from "./Title";

interface Props {
  fn: () => void;
  btn: string;
  cls: string;
  Icon?: React.ComponentType;
  title?: string;
}
const OpacityBtn = ({ fn, btn, cls, Icon, title }: Props) => {
  const [bool, show, hide] = useShowTitle();
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
      className={`title-par center gap ${cls}`}
      onClick={fn}
      onHoverStart={show}
      onHoverEnd={hide}
    >
      {Icon && <Icon />}
      {btn}
      {title && <Title title={title} bool={bool} />}
    </motion.button>
  );
};

export default OpacityBtn;
