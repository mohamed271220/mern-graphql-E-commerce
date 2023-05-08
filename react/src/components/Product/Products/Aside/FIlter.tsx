import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { opacityVariant, parentVariant } from "../../../../variants/globals";
import useHide from "../../../../custom/useHide";
import { FcMinus } from "react-icons/fc";
import { BiPlus } from "react-icons/bi";
import { ChildrenInterFace } from "../../../../interfaces/general";
import Title from "../../../widgets/Title";
import useShowTitle from "../../../../custom/useShowTitle";

interface Props extends ChildrenInterFace {
  head: string;
}
const FIlter = ({ head, children }: Props) => {
  const [showCategory, handleShowCategory, handleHideCategory] = useHide();
  const [bool, show, hide] = useShowTitle();
  return (
    <>
      <div className="category-par  ">
        <h4 className="filter-head  header   underline">
          {head}
          <AnimatePresence mode="wait">
            <motion.span
              variants={opacityVariant}
              initial="start"
              animate="end"
              exit="exit"
              key={"plus"}
              transition={{ duration: 0.4 }}
            >
              <Title title={showCategory ? "collapse" : "expand"}>
                {showCategory ? (
                  <FcMinus onClick={handleHideCategory} />
                ) : (
                  <BiPlus onClick={handleShowCategory} />
                )}
              </Title>
            </motion.span>
          </AnimatePresence>
        </h4>

        <>
          <AnimatePresence mode="wait">
            {showCategory && (
              <motion.div
                variants={parentVariant}
                initial="start"
                animate="end"
                exit={"exit"}
                key={"category"}
                className="   category-par"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      </div>
      <div className="hr"></div>
    </>
  );
};

export default FIlter;
