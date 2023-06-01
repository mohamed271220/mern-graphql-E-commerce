import React, { Fragment } from "react";

import DashForm from "./DashForm";
import { useMutation } from "@apollo/client";
import { Add_Product } from "../../graphql/mutations/product.js";
import { GrAddCircle } from "react-icons/gr";

const DashAddProduct = () => {
  const [addProductFn] = useMutation(Add_Product);
  return (
    <Fragment>
      <DashForm
        key={"addProduct"}
        Icon={GrAddCircle}
        head="add product"
        fn={addProductFn}
        btn="add"
        type="add"
      />
    </Fragment>
  );
};

export default DashAddProduct;
