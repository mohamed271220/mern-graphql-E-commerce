import React, { useContext } from "react";
import { categoriesArr } from "../../../../arries";
import { opacityVariant } from "../../../../variants/globals";
import { productListContext } from "../../../../context/FilterData";
import Checkbox from "../../../../custom SVGs/checkbox";
import { motion } from "framer-motion";
import FIlter from "./FIlter";
const Category = () => {
  const { categoryFilter, setCategoryFilter } = useContext(productListContext);

  return (
    <FIlter head="category">
      {categoriesArr.map((category, i) => {
        return (
          <motion.span
            className="center category"
            style={{ width: "fit-content" }}
            key={i}
            variants={opacityVariant}
            onClick={() =>
              setCategoryFilter(category === categoryFilter ? "" : category)
            }
          >
            <Checkbox
              filter={category}
              isChecked={categoryFilter}
              setIsChecked={setCategoryFilter}
            />
            {category}
          </motion.span>
        );
      })}
    </FIlter>
  );
};

export default Category;
