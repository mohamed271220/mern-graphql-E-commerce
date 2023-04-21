import React, { createContext, useEffect, useState } from "react";
import Aside from "./Aside/Aside";
import ProductList from "./AllProducts/ProductList";
import { AnimatePresence } from "framer-motion";
import Sort from "../viewOptions/Sort";

interface productListContextInterface {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showFilter: boolean;

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
  productSearchWord: string;
  setroductSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

export const productListContext = createContext(
  {} as productListContextInterface
);

const Products = () => {
  const [startFiltering, setStartFiltering] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState<string | number>("");
  const [productFeatured, setProductFeatured] = useState<string | number>("");
  const [priceFilter, setPriceFilter] = useState<string | number>(0);
  const [RateChecked, setRateChecked] = useState<string | number>("");
  const [productSearchWord, setroductSearchWord] = useState<string>("");

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
    <productListContext.Provider
      value={{
        setShowFilter,
        showFilter,

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
        productSearchWord,
        setroductSearchWord,
      }}
    >
      <section className="products-par">
        <h1 className="sort-title header underline">Our Products</h1>

        <Sort />

        <div className="center row start between">
          <AnimatePresence mode="wait">
            {showFilter && <Aside startFiltering={startFiltering} />}
          </AnimatePresence>
          <ProductList />
        </div>
      </section>
    </productListContext.Provider>
  );
};

export default Products;
