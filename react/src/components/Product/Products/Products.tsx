import React from "react";
import Aside from "./Aside";
import ProductList from "./ProductList";

const Products = () => {
  return (
    <>
      <h1 className="heading head-product center">Our Products</h1>
      <section className="products-par">
        <Aside />
        <ProductList />
      </section>
    </>
  );
};

export default Products;
