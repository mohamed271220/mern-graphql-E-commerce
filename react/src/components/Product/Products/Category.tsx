import React from "react";
import Checkbox from "../../../custom/checkbox";
import useHide from "../../../custom/useHide";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant, parentVariant } from "../../../variants/globals";
const categoriesArr = ["fashion", "laptops", "mobiles"];
import { FcMinus } from "react-icons/fc";
import { BiPlus } from "react-icons/bi";
const Category = () => {
  const [showCategory, handleShowCategory, handleHideCategory] = useHide();

  return (
    <div className="category-par center ">
      <h4 className="filter-head  ">
        {" "}
        categoty
        <AnimatePresence mode="wait">
          {showCategory ? (
            <motion.span
              variants={opacityVariant}
              initial="start"
              animate="end"
              exit="exit"
              key={"plus"}
              transition={{ duration: 0.4 }}
            >
              <FcMinus onClick={handleHideCategory} />
            </motion.span>
          ) : (
            <motion.span
              variants={opacityVariant}
              initial="start"
              animate="end"
              exit={"exit"}
              key={"minus"}
              transition={{ duration: 0.4 }}
            >
              <BiPlus onClick={handleShowCategory} />
            </motion.span>
          )}
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
              <>
                {categoriesArr.map((category, i) => {
                  return (
                    <motion.span
                      className="center category"
                      key={i}
                      variants={opacityVariant}
                    >
                      <Checkbox /> {category}{" "}
                    </motion.span>
                  );
                })}
              </>
            </motion.div>
          )}
        </AnimatePresence>
      </>
      <div className="hr"></div>
    </div>
  );
};

export default Category;
