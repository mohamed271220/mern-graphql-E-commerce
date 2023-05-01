import React, { useState } from "react";
import Transition from "../widgets/Transition";
import ProductSelect from "./ProductSelect";
import SeletedProduct from "./SeletedProduct";

const CompareProducts = () => {
  const [firstproduct, setFirstProduct] = useState(
    "-- select first product --"
  );
  const [secondproduct, setSecondProduct] = useState(
    "-- select second product --"
  );
  return (
    <div className="select-compare">
      <Transition />
      <SeletedProduct product={firstproduct} setProduct={setFirstProduct} />
      <SeletedProduct product={secondproduct} setProduct={setSecondProduct} />
    </div>
  );
};

export default CompareProducts;
