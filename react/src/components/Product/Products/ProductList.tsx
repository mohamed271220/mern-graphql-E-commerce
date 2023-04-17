import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Get_All_Products } from "../../../graphql/general";
import ProductFliter from "./ProductFliter";
import { useAppSelector } from "../../../custom/reduxTypes";
import { isAuthContext } from "../../../context/isAuth";
import Pages from "./Pages";

const ProductList = () => {
  const { data, loading, error } = useQuery(Get_All_Products);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPage] = useState(0);
  const [dataShown, setDataShown] = useState([]);
  const numberOfProducts = 8;
  const firstProduct = page * numberOfProducts - 8;
  const lastProduct = page * numberOfProducts;

  useEffect(() => {
    setDataShown(data?.products.slice(firstProduct, lastProduct));
    setNumOfPage(Math.ceil(data?.products.length / 8));
  }, [page]);

  if (loading) {
    return <>loading</>;
  } else {
    return (
      <div className="product-list-par">
        {dataShown?.map((product: any, index: number) => {
          return (
            <ProductFliter
              key={`${product._id}-list`}
              index={index}
              {...product}
            />
          );
        })}
        <Pages
          key={"pages"}
          page={page}
          numOfPages={numOfPages}
          setPage={setPage}
        />
      </div>
    );
  }
};

export default ProductList;
