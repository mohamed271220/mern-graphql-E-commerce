import React from "react";
import FadeElement from "./FadeElement";
import { ChildrenInterFace } from "../../interfaces/general";
import { AnimatePresence } from "framer-motion";

interface Props extends ChildrenInterFace {
  length: number;
  message: string;
}
const NoData = ({ length, children, message }: Props) => {
  return (
    <AnimatePresence mode="wait">
      {length >= 1 ? (
        children
      ) : (
        <FadeElement cls="shadow no-data" key={message}>
          <>{message}</>
        </FadeElement>
      )}
    </AnimatePresence>
  );
};

export default NoData;
