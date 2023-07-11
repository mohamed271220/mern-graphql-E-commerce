import React, { Fragment } from "react";
import FadeElement from "./FadeElement";
import { ChildrenInterFace } from "../../interfaces/general";
import { AnimatePresence } from "framer-motion";

interface Props extends ChildrenInterFace {
  length: number;
  message: string;
  cls?: string;
}
const NoData = ({ length, children, message, cls }: Props) => {
  return (
    <AnimatePresence mode="wait">
      {length >= 1 ? (
        children
      ) : (
        <FadeElement cls={`shadow no-data ${cls}`} key={message}>
          <Fragment>{message}</Fragment>
        </FadeElement>
      )}
    </AnimatePresence>
  );
};

export default NoData;
