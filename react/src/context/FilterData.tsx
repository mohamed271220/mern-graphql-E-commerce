import React, { createContext, useEffect, useState } from "react";
import { ChildrenInterFace } from "../interfaces/general.js";
import { useQuery } from "@apollo/client";
import { Get_All_Products } from "../graphql/general.js";
import { addToProductRedux } from "../redux/productSlice.js";
import { useAppDispatch } from "../custom/reduxTypes.js";
import { ProductInterface } from "../interfaces/product.js";
import { GET_ALL_ORDERS } from "../graphql/queries.js";
import { addToOrderRedux } from "../redux/OrderSlice.js";
import { GET_ALL_USERS } from "../graphql/mutations/user.js";
import { addToUserRedux } from "../redux/UserSlice.js";
import useIsMobile from "../custom/useIsMobile.js";

interface productListContextInterface {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showFilter: boolean;

  setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
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
  const { data, loading } = useQuery(Get_All_Products, {});
  const { isMobile } = useIsMobile();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data?.products) {
      dispatch(addToProductRedux(data?.products));
      setProducts(data?.products);
    }
  }, [loading]);

  const [showFilter, setShowFilter] = useState(false);

  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | number>("");
  const [productFeatured, setProductFeatured] = useState<string | number>("");
  const [priceFilter, setPriceFilter] = useState<string | number>(0);
  const [RateChecked, setRateChecked] = useState<string | number>("");
  const [productSearchWord, setroductSearchWord] = useState<string>("");
  const { data: orderData } = useQuery(GET_ALL_ORDERS);
  useEffect(() => {
    if (orderData?.orders) {
      dispatch(addToOrderRedux(orderData?.orders));
    }
  }, [orderData?.orders]);

  const { data: userData, loading: usersLoading } = useQuery(GET_ALL_USERS);
  useEffect(() => {
    if (userData?.users && !usersLoading) {
      dispatch(addToUserRedux(userData?.users));
    }
  }, [usersLoading]);

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
