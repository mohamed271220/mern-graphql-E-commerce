import React, { useContext } from "react";
import { showAsideContext } from "./Dashboard";
import { motion } from "framer-motion";
import { ChildrenInterFace } from "../../interfaces/general";
import Transition from "../widgets/Transition";

interface Props extends ChildrenInterFace {
  head: string;
}

const DashMain = ({ head, children }: Props) => {
  const { showAsideDash } = useContext(showAsideContext);
  return (
    <motion.section
      className="dash-product"
      animate={{
        width: showAsideDash ? "calc(100% - 180px )" : "90%",
      }}
    >
      <Transition />
      <h2 className="underline header">{head}</h2>
      {children}
    </motion.section>
  );
};
export default DashMain;
