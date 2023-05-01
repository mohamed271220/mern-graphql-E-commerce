import React, { useState } from "react";
import ProductSelect from "./ProductSelect";
import { GET_Product_By_Id } from "../../graphql/general";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "../../custom/reduxTypes";
import SelectedProductData from "./SelectedProductData";
interface Props {
  product: string;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
}
const SeletedProduct = ({ product, setProduct }: Props) => {
  const { compare } = useAppSelector((state) => state.compare);
  console.log({ compare });
  const obj = compare.find((ob) => ob.title === product);
  const { data, error, loading } = useQuery(GET_Product_By_Id, {
    variables: { id: obj?.productId ? obj!.productId : null },
  });

  return (
    <div className="center col w-100">
      <ProductSelect setProduct={setProduct} product={product} />

      {data?.product._id && (
        <SelectedProductData key={data?.product?._id} {...data?.product} />
      )}
    </div>
  );
};
export default SeletedProduct;
