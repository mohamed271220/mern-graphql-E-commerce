import React, { useContext } from "react";
import Checkbox from "../../../../custom SVGs/checkbox";
import useHide from "../../../../custom/useHide";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant, parentVariant } from "../../../../variants/globals";
import { FcMinus } from "react-icons/fc";
import { BiPlus } from "react-icons/bi";
import { viewFilterContext } from "../Products";
import { FeaturedProductsArr } from "../../../../arries.js";

const FeaturedProducts = () => {
  const [showCategory, handleShowCategory, handleHideCategory] = useHide();
  const { productFeatured, setProductFeatured } = useContext(viewFilterContext);

  return (
    <div className="category-par center ">
      <h4 className="filter-head  ">
        Featured Products
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
                {FeaturedProductsArr.map((category, i) => {
                  return (
                    <motion.span
                      className="center category"
                      key={i}
                      variants={opacityVariant}
                    >
                      <Checkbox
                        filter={category}
                        isChecked={productFeatured}
                        setIsChecked={setProductFeatured}
                      />{" "}
                      {category}
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

export default FeaturedProducts;
