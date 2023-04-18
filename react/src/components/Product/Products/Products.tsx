import React, { createContext, useEffect, useState } from "react";
import Aside from "./Aside";
import ProductList from "./ProductList";
import { AnimatePresence } from "framer-motion";
import Sort from "./Sort";

interface viewFilterContextInterface {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showFilter: boolean;
  setGridView: React.Dispatch<React.SetStateAction<boolean>>;
  gridView: boolean;
  setProducts: React.Dispatch<React.SetStateAction<never[]>>;
  products: any[];
  categoryFilter: string | number;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string | number>>;
  productFeatured: string | number;
  setProductFeatured: React.Dispatch<React.SetStateAction<string | number>>;
  priceFilter: string | number;
  setPriceFilter: React.Dispatch<React.SetStateAction<number | string>>;
  RateChecked: string | number;
  setRateChecked: React.Dispatch<React.SetStateAction<number | string>>;
}

export const viewFilterContext = createContext(
  {} as viewFilterContextInterface
);

const Products = () => {
  const [startFiltering, setStartFiltering] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [gridView, setGridView] = useState(false);
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState<string | number>("");
  const [productFeatured, setProductFeatured] = useState<string | number>("");
  const [priceFilter, setPriceFilter] = useState<string | number>(0);
  const [RateChecked, setRateChecked] = useState<string | number>("");

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
    <viewFilterContext.Provider
      value={{
        setShowFilter,
        showFilter,
        gridView,
        setGridView,
        products,
        setProducts,
        categoryFilter,
        setCategoryFilter,
        productFeatured,
        setProductFeatured,
        priceFilter,
        setPriceFilter,
        RateChecked,
        setRateChecked,
      }}
    >
      <section className="products-par">
        <Sort />

        <AnimatePresence mode="wait">
          {showFilter && <Aside startFiltering={startFiltering} />}
        </AnimatePresence>
        <ProductList />
      </section>
    </viewFilterContext.Provider>
  );
};

export default Products;
