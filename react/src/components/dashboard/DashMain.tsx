import React, { useContext } from "react";
import { showAsideContext } from "./Dashboard";
import { motion } from "framer-motion";
import { ChildrenInterFace } from "../../interfaces/general";
import Transition from "../widgets/react Transition";
import BeardCrumbs from "./BeardCrumbs";

interface Props extends ChildrenInterFace {
  head: string;
}

const DashMain = ({ head, children }: Props) => {
  const { showAsideDash } = useContext(showAsideContext);
  return (
    <motion.section
      className="dash-product"
      animate={{
        width: showAsideDash ? "calc(100% - 210px )" : "95%",
        margin: showAsideDash ? "20px 10px 10px 210px" : "20px auto",
      }}
      transition={{ delay: showAsideDash ? 0.2 : 0.7 }}
    >
      <Transition />

      <BeardCrumbs />
      <h2 className="underline header">{head}</h2>
      {children}
    </motion.section>
  );
};
export default DashMain;
