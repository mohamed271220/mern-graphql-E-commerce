import React, { useContext } from "react";
import { showAsideContext } from "./Dashboard";
import { motion } from "framer-motion";
import { ChildrenInterFace } from "../../interfaces/general";
import BeardCrumbs from "./BeardCrumbs";
import useIsMobile from "../../custom/useIsMobile";
import Animation from "../widgets/Animation";

interface Props extends ChildrenInterFace {
  head: string;
}

const DashMain = ({ head, children }: Props) => {
  const { showAsideDash } = useContext(showAsideContext);
  const { isMobile } = useIsMobile();
  console.log({ isMobile });
  return (
    <motion.section
      className="dash-product"
      animate={{
        width: showAsideDash && !isMobile ? "calc(100% - 210px )" : "95%",
        margin:
          showAsideDash && !isMobile ? "20px 10px 10px 210px" : "20px auto",
      }}
      transition={{ delay: showAsideDash ? 0.2 : 0.7 }}
    >
      <Animation>
        <BeardCrumbs />
        <h2 className="underline header">{head}</h2>
        {children}
      </Animation>
    </motion.section>
  );
};
export default DashMain;
