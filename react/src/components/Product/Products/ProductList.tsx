import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Get_All_Products } from "../../../graphql/general";
import ProductFliter from "./ProductFliter";
import { useAppSelector } from "../../../custom/reduxTypes";
import { isAuthContext } from "../../../context/isAuth";

const ProductList = () => {
  const { fav } = useAppSelector((state) => state.fav);
  console.log({ fav });

  const { data, loading, error } = useQuery(Get_All_Products);
  // const userData = useContext(isAuthContext);
  if (loading) {
    return <>loading</>;
  } else {
    return (
      <div className="product-list-par">
        {data.products.map((product: any, index: number) => {
          return <ProductFliter key={`${product._id}-list`} {...product} />;
        })}
      </div>
    );
  }
};

export default ProductList;
