import React, { createContext, useState } from "react";
import { ChildrenInterFace } from "../interfaces/general.js";

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

const FilterDataContext = ({ children }: ChildrenInterFace) => {
  const [showFilter, setShowFilter] = useState(true);
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState<string | number>("");
  const [productFeatured, setProductFeatured] = useState<string | number>("");
  const [priceFilter, setPriceFilter] = useState<string | number>(0);
  const [RateChecked, setRateChecked] = useState<string | number>("");
  const [productSearchWord, setroductSearchWord] = useState<string>("");

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
      {children}
    </productListContext.Provider>
  );
};

export default FilterDataContext;
