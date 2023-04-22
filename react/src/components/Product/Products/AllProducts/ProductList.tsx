import React, { useContext, useEffect, useState } from "react";
import ProductFliter from "./ProductFliter";
import Pages from "../Pages";
import { motion } from "framer-motion";
import { viewContext } from "../../../../context/gridView";
import { productListContext } from "../../../../context/FilterData";

const ProductList = () => {
  const { showFilter, products } = useContext(productListContext);
  const { gridView } = useContext(viewContext);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPage] = useState(0);
  const [dataShown, setDataShown] = useState([] as any);
  const numberOfProducts = 8;
  const firstProduct = page * numberOfProducts - 8;
  const lastProduct = page * numberOfProducts;

  useEffect(() => {
    if (products.length >= 0) {
      setDataShown(products?.slice(firstProduct, lastProduct));
      setNumOfPage(Math.ceil(products?.length / 8));
    }
  }, [page, products]);

  return (
    <motion.div
      className={`product-list-par ${!gridView ? "list" : "grid"} `}
      animate={{ width: showFilter ? " calc(100% - 200px - 20px)" : "90%" }}
      transition={{ delay: 0.4 }}
    >
      {dataShown?.map((product: any, index: number) => {
        return (
          <ProductFliter
            key={`${product._id}-list`}
            index={index}
            // {...product}
            _id={product._id}
            price={product.price}
            stock={product.stock}
            title={product.title}
            state={product.state}
            category={product.category}
            images={product.images}
            rating={product.rating}
            description={product.description}
            layout
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.5,
              // stiffness: 300,
              damping: 7,
              // mass: 0.8,
            }}
          />
        );
      })}
      <Pages
        key={"pages"}
        page={page}
        numOfPages={numOfPages}
        setPage={setPage}
      />
    </motion.div>
  );
};

export default ProductList;
