import React, { useContext } from "react";
import { IoFilter } from "react-icons/io5";
import Category from "./Category";
import Rating from "./Rating";
import Price from "./Price";
import { AnimatePresence, motion } from "framer-motion";
import FeaturedProducts from "./FeaturedProducts";
import { opacityVariant } from "../../../variants/globals";
import { useMutation } from "@apollo/client";
import { viewFilterContext } from "./Products";
import { FILTER_All } from "../../../graphql/mutations/product.js";
import { FeaturedProductsArr, categoriesArr } from "../../../arries.js";

const asideVariant = {
  start: { width: 0, opacity: 0 },
  end: {
    width: "30%",
    opacity: 1,
    transition: {
      opacity: { delay: 0.4, duration: 0.4 },
      width: { delay: 0, duration: 0.4 },
    },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: {
      opacity: { delay: 0, duration: 0.1 },
      width: { delay: 0.2, duration: 0.2 },
    },
  },
};
const Aside = ({ startFiltering }: { startFiltering: boolean }) => {
  const {
    categoryFilter,
    priceFilter,
    RateChecked,
    productFeatured,
    setProducts,
  } = useContext(viewFilterContext);
  const [filterAllFn] = useMutation(FILTER_All);

  return (
    <motion.aside
      variants={asideVariant}
      initial="start"
      exit="exit"
      animate="end"
      key={"aside"}
    >
      <div className="aside-head center">
        <div className="filter-icon center">
          <IoFilter />
          <span className="filter-head">filter</span>
        </div>
        <div className="collapse-par center">
          <AnimatePresence>
            {startFiltering && (
              <motion.button
                key={"apply-btn"}
                variants={opacityVariant}
                transition={{ duration: 0.4 }}
                initial="start"
                exit="exit"
                animate="end"
                className="btn shadow "
                onClick={() => {
                  console.log({
                    price: priceFilter === 0 ? 10000 : priceFilter,
                    category:
                      categoryFilter === "" ? categoriesArr : [categoryFilter],
                    state:
                      productFeatured === ""
                        ? FeaturedProductsArr
                        : [productFeatured],
                    rate: RateChecked === "" ? 5 : RateChecked,
                  });

                  filterAllFn({
                    variables: {
                      price: priceFilter === 0 ? 10000 : priceFilter,
                      category:
                        categoryFilter === ""
                          ? categoriesArr
                          : [categoryFilter],
                      state:
                        productFeatured === ""
                          ? FeaturedProductsArr
                          : [productFeatured],
                      rate: RateChecked === "" ? 5 : RateChecked,
                    },
                  }).then(({ data }) => setProducts(data.filterAllTypes));
                }}
              >
                apply
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="hr"></div>

      <FeaturedProducts />
      <Category />
      <Rating />
      <Price />
    </motion.aside>
  );
};

export default Aside;
