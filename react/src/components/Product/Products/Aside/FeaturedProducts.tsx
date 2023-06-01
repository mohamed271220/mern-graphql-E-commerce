import React, { useContext } from "react";
import Checkbox from "../../../../custom SVGs/checkbox";
import { opacityVariant } from "../../../../variants/globals";
import { FeaturedProductsArr } from "../../../../assets/arries/arries.js";
import { productListContext } from "../../../../context/FilterData";
import { motion } from "framer-motion";
import FIlter from "./FIlter";

const FeaturedProducts = () => {
  const { productFeatured, setProductFeatured } =
    useContext(productListContext);

  return (
    <FIlter head="featured products">
      {FeaturedProductsArr.map((category, i) => {
        return (
          <motion.span
            className="center category"
            style={{ width: "fit-content" }}
            key={i}
            variants={opacityVariant}
            onClick={() =>
              setProductFeatured(category === productFeatured ? "" : category)
            }
          >
            <Checkbox
              filter={category}
              isChecked={productFeatured}
              setIsChecked={setProductFeatured}
            />
            {category}
          </motion.span>
        );
      })}
    </FIlter>
  );
};

export default FeaturedProducts;
