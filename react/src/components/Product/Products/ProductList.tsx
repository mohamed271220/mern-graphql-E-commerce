import React from "react";
import { useQuery } from "@apollo/client";
import { Get_All_Products } from "../../../graphql/general";
import ProductFliter from "./ProductFliter";

const ProductList = () => {
  const { data, loading, error } = useQuery(Get_All_Products);
  console.log(data, loading, error);

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
