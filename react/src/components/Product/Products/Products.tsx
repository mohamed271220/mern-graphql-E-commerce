import React, { useContext, useEffect, useState } from "react";
import Aside from "./Aside/Aside";
import ProductList from "./AllProducts/ProductList";
import { AnimatePresence } from "framer-motion";
import Sort from "../viewOptions/Sort";
import { productListContext } from "../../../context/FilterData";
import MainProductAnimation from "./MainProductAnimation";

const Products = () => {
  const [startFiltering, setStartFiltering] = useState(false);
  const {
    RateChecked,
    priceFilter,
    categoryFilter,
    productFeatured,
    showFilter,
  } = useContext(productListContext);
  useEffect(() => {
    if (
      RateChecked === "" &&
      priceFilter === 0 &&
      categoryFilter === "" &&
      productFeatured === ""
    ) {
      setStartFiltering(false);
    } else {
      setStartFiltering(true);
    }
  }, [RateChecked, priceFilter, categoryFilter, productFeatured]);

  return (
    <section id="products" className="products-par">
      <h1 className="sort-title header underline">Our Products</h1>
      <MainProductAnimation />
      <Sort />

      <div className="center row start between">
        <AnimatePresence mode="wait">
          {showFilter && <Aside startFiltering={startFiltering} />}
        </AnimatePresence>
        <ProductList />
      </div>
    </section>
  );
};

export default Products;
