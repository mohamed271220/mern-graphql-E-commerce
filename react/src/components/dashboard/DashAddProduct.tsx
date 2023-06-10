import React, { Fragment, useEffect } from "react";

import DashForm from "./DashForm";
import { useMutation } from "@apollo/client";
import { Add_Product } from "../../graphql/mutations/product.js";
import { GrAddCircle } from "react-icons/gr";

const DashAddProduct = () => {
  const [addProductFn] = useMutation(Add_Product);
  useEffect(() => {
    setTimeout(() => {
      document.title = "Dashboaed | add Product";
    }, 1000);
  }, []);
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
