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
import { asideVariant, opacityVariant } from "../../../../variants/globals";
import { useAppSelector } from "../../../../custom/reduxTypes";
import useIsMobile from "../../../../custom/useIsMobile";
import { AiFillCloseCircle } from "react-icons/ai";
import Title from "../../../widgets/Title";

const Aside = ({ startFiltering }: { startFiltering: boolean }) => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
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
    setShowFilter,
  } = useContext(productListContext);
  const { isMobile } = useIsMobile();
  const [filterAllFn] = useMutation(FILTER_All);

  const handleFiltering = () => {
    if (isMobile) {
      setShowFilter(false);
    }
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
    setProducts(Allproducts);
  };
  return (
    <motion.aside
      variants={asideVariant}
      initial="start"
      exit="exit"
      animate="end"
      key={"aside"}
      custom={isMobile}
      className="aside-products"
    >
      <div className="aside-head center">
        <div className="filter-icon center">
          <IoFilter className="icon" color="var(--third)" />
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
      <AnimatePresence>
        {isMobile && (
          <motion.span
            key={"hide-dash"}
            variants={opacityVariant}
            transition={{ duration: 0.4 }}
            className="dash-aside-close"
            onClick={() => setShowFilter(false)}
          >
            <Title title="hide filters">
              <AiFillCloseCircle className="icon red" />
            </Title>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default Aside;
