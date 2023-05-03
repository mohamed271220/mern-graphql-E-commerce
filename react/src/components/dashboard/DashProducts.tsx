import React, { useContext, useEffect } from "react";
import ProductList from "../Product/Products/AllProducts/ProductList";
import { viewContext } from "../../context/gridView";
import DashMain from "./DashMain";
import { useLazyQuery } from "@apollo/client";
import { Get_All_Products } from "../../graphql/general";
import { productListContext } from "../../context/FilterData";

const DashProducts = () => {
  const { setGridView } = useContext(viewContext);
  const { setProducts, products } = useContext(productListContext);
  const [fnRevlence] = useLazyQuery(Get_All_Products);

  console.log(products);
  useEffect(() => {
    if (products.length <= 0) {
      fnRevlence().then(({ data }) => setProducts(data.products));
    }
  }, []);

  useEffect(() => {
    setGridView(true);
  }, []);
  return (
    <DashMain head="products">
      <div className=" dash-products">
        <ProductList isDash />
      </div>
    </DashMain>
  );
};

export default DashProducts;
