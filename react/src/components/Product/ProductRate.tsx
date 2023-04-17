import StarIcon from "../../custom/StarIcon";
import React from "react";
const ProductRate = ({
  avgRate,
  ratingLen,
}: {
  ratingLen: number;
  avgRate: number;
}) => {
  return (
    <div className="product-rate">
      <>
        {[1, 2, 3, 4, 5].map((e, i) => {
          return <StarIcon key={e} id={i} avgRate={avgRate} />;
        })}
      </>

      <span className="shadow rate"> {avgRate.toFixed(1)}</span>
      <span
        style={{
          color: "var(--green)",
          fontWeight: "bold",
          marginLeft: 6,
        }}
        className="shadow"
      >
        ({ratingLen})
      </span>
    </div>
  );
};

export default ProductRate;
