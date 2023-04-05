import StarIcon from "../../custom/StarIcon";
import React, { useContext, useEffect, useState } from "react";
import { productContext } from "./Product";

const ProductRate = () => {
  const { rating } = useContext(productContext);
  const [avgRate, setAvgRate] = useState(-1);

  const getAvg = (arr: number[]) => {
    let result = 0;
    const len = arr.length;

    for (const num of arr) {
      result += num;
    }

    return result / len;
  };

  useEffect(() => {
    setAvgRate(getAvg(rating));
  }, []);

  return (
    <div className="product-rate ">
      <>
        {[1, 2, 3, 4, 5].map((e, i) => {
          return <StarIcon key={e} id={i} avgRate={avgRate} />;
        })}
      </>

      <span className="rate"> {avgRate}</span>
      <span
        style={{
          color: "var(--green)",
          fontWeight: "bold",
          marginLeft: 6,
          scale: 0.8,
        }}
      >
        ({rating.length})
      </span>
    </div>
  );
};

export default ProductRate;
