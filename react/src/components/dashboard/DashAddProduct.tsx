import React from "react";

import DashForm from "./DashForm";
import { useMutation, useQuery } from "@apollo/client";
import { Add_Product } from "../../graphql/mutations/product";

const DashAddProduct = () => {
  const [addProductFn] = useMutation(Add_Product);
  return (
    <>
      <DashForm head="add product" fn={addProductFn} btn="add" />
    </>
  );
};

export default DashAddProduct;
