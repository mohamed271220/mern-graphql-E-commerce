import React, { useState } from "react";
import Transition from "../widgets/Transition";
import ProductSelect from "./ProductSelect";
import SeletedProduct from "./SeletedProduct";

const CompareProducts = () => {
  const [firstproduct, setFirstProduct] = useState("");
  const [secondproduct, setSecondProduct] = useState("");
  return (
    <div className="select-compare">
      <Transition />
      <SeletedProduct
        order="first"
        product={firstproduct}
        setProduct={setFirstProduct}
      />
      <SeletedProduct
        order="second"
        product={secondproduct}
        setProduct={setSecondProduct}
      />
    </div>
  );
};

export default CompareProducts;
