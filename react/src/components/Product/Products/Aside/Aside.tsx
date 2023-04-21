import React, { useContext } from "react";
import { IoFilter } from "react-icons/io5";
import Rating from "./Rating";
import Price from "./Price";
import { AnimatePresence, motion } from "framer-motion";
import FeaturedProducts from "./FeaturedProducts";
import { btnHover, btnTap, opacityVariant } from "../../../../variants/globals";
import { useMutation } from "@apollo/client";
import { productListContext } from "../Products";
import { FILTER_All } from "../../../../graphql/mutations/product.js";
import { FeaturedProductsArr, categoriesArr } from "../../../../arries.js";
import Search from "../../viewOptions/Search";
import Category from "./Category";
import AsideBtn from "./AsideBtn";

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
    setCategoryFilter,
    priceFilter,
    setPriceFilter,
    RateChecked,
    setRateChecked,
    productFeatured,
    setProductFeatured,
    setProducts,
  } = useContext(productListContext);

  const [filterAllFn] = useMutation(FILTER_All);

  const handleFiltering = () => {
    filterAllFn({
      variables: {
        price: priceFilter === 0 ? 10000 : priceFilter,
        category: categoryFilter === "" ? categoriesArr : [categoryFilter],
        state: productFeatured === "" ? FeaturedProductsArr : [productFeatured],
        rate: RateChecked === "" ? 5 : RateChecked,
      },
    }).then(({ data }) => setProducts(data.filterAllTypes));
  };

  const handleResetFiltering = () => {
    setCategoryFilter("");
    setRateChecked("");
    setPriceFilter(0);
    setProductFeatured("");
  };
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
          <AsideBtn
            key={"apply-btn"}
            cls={"btn shadow main"}
            btn={"apply"}
            fn={handleFiltering}
            startFiltering={startFiltering}
          />
        </div>
      </div>
      <div className="hr"></div>

      <FeaturedProducts />
      <Category />
      <Rating />
      <Price />

      <AsideBtn
        key={"reset-filter-btn"}
        cls={"btn w-100 reset-filter"}
        btn={"            reset filters"}
        fn={handleResetFiltering}
        startFiltering={startFiltering}
      />
    </motion.aside>
  );
};

export default Aside;
