import React, { useContext, useEffect, useState } from "react";
import ProductFliter from "./ProductFliter";
import Pages from "../Pages";
import { motion } from "framer-motion";
import { viewContext } from "../../../../context/gridView";
import { productListContext } from "../../../../context/FilterData";
import useNumberOfPages from "../../../../custom/useNumberOfPages";
import usePagination from "../../../../custom/useNumberOfPages";

const ProductList = ({ isDash }: { isDash?: boolean }) => {
  const { showFilter, products } = useContext(productListContext);
  const { gridView } = useContext(viewContext);
  const [page, setPage] = useState(1);

  const [dataShown, numberOfPages] = usePagination(8, page, products);

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
            isDash={isDash}
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
            reviews={product.reviews}
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
        numOfPages={numberOfPages}
        setPage={setPage}
      />
    </motion.div>
  );
};

export default ProductList;
