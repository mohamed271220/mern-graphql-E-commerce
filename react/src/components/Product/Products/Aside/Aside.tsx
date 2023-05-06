import React, { useContext } from "react";
import { IoFilter } from "react-icons/io5";
import Rating from "./Rating";
import Price from "./Price";
import { AnimatePresence, motion } from "framer-motion";
import FeaturedProducts from "./FeaturedProducts";
import { useMutation } from "@apollo/client";
import { FILTER_All } from "../../../../graphql/mutations/product.js";
import { FeaturedProductsArr, categoriesArr } from "../../../../arries.js";
import OpacityBtn from "../../../widgets/OpacityBtn";
import { MdFilterListAlt } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { productListContext } from "../../../../context/FilterData";
import Category from "./Category";
import { asideVariant } from "../../../../variants/globals";

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
        input: {
          price: priceFilter === 0 ? 10000 : priceFilter,
          category: categoryFilter === "" ? categoriesArr : [categoryFilter],
          state:
            productFeatured === "" ? FeaturedProductsArr : [productFeatured],
          rate: RateChecked === "" ? 5 : Number(RateChecked),
        },
      },
    }).then(({ data }) => setProducts(data?.filterAllTypes));
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
          <AnimatePresence>
            {startFiltering && (
              <OpacityBtn
                key={"apply-btn"}
                cls={"btn shadow main center  gap"}
                btn={"apply"}
                fn={handleFiltering}
                Icon={MdFilterListAlt}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="hr"></div>

      <FeaturedProducts />
      <Category />
      <Rating />
      <Price />
      <AnimatePresence>
        {startFiltering && (
          <OpacityBtn
            key={"reset-filter-btn"}
            cls={"btn w-100 reset-filter center  gap"}
            btn={"            reset filters"}
            fn={handleResetFiltering}
            Icon={FiRefreshCcw}
          />
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default Aside;
