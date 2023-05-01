import React, { useEffect, useState } from "react";
import ProductSelect from "./ProductSelect";
import { GET_Product_By_Id } from "../../graphql/general";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "../../custom/reduxTypes";
import SelectedProductData from "./SelectedProductData";
import { motion, AnimatePresence } from "framer-motion";
import FadeElement from "../widgets/FadeElement";
interface Props {
  product: string;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
  order: string;
}
const SeletedProduct = ({ product, setProduct, order }: Props) => {
  const { compare } = useAppSelector((state) => state.compare);
  const obj = compare.find((ob) => ob.title === product);
  const { data, error, loading } = useQuery(GET_Product_By_Id, {
    variables: { id: obj?.productId ? obj!.productId : null },
  });

  return (
    <div className="center col gap w-100">
      <ProductSelect
        setProduct={setProduct}
        product={product === "" ? `-- select ${order} product --` : product}
      />
      <AnimatePresence initial={false}>
        <motion.div
          className="w-100 center col selected-pro-data"
          initial={{
            boxShadow: product !== "" ? "0 0 0 #fff" : "2px 2px 5px #000",
          }}
          animate={{
            boxShadow: product !== "" ? "2px 2px 5px #000" : "0 0 0 #fff",
          }}
          transition={{ delay: product !== "" ? 0.4 : 0, duration: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {product !== "" ? (
              <>
                {data?.product._id && (
                  <SelectedProductData
                    setProduct={setProduct}
                    key={data?.product?._id}
                    {...data?.product}
                  />
                )}
              </>
            ) : (
              <FadeElement
                key={"no data compare"}
                cls="nodata-compare center"
                transition={product !== "" ? 0.8 : 0.5}
              >
                select the {order} product
              </FadeElement>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default SeletedProduct;
