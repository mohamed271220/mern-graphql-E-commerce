import { motion } from "framer-motion";
import React from "react";
import { btnHover, btnTap, opacityVariant } from "../../variants/globals";
import Title from "./Title";

interface Props {
  fn: () => void;
  btn: string;
  cls: string;
  Icon?: React.ComponentType;
  title?: string;
  pos?: string;
  parCls?: string;
  type?: "submit" | "button" | "reset";
}
const OpacityBtn = ({
  type = "button",
  pos = "left",
  parCls,
  fn,
  btn,
  cls,
  Icon,
  title,
}: Props) => {
  return (
    <Title title={title ? title : ""} cls={parCls}>
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
        style={{ color: "var(--white)" }}
        type={type}
      >
        {Icon && pos === "left" && <Icon />}
        {btn}
        {Icon && pos === "right" && <Icon />}
      </motion.button>
    </Title>
  );
};

export default OpacityBtn;
