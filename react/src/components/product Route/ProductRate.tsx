import StarIcon from "../../custom SVGs/StarIcon";
import React from "react";
import RatingDetails from "../Product/RateDetails";
import { reviewInterface } from "../../interfaces/product";

const ProductRate = ({
  avgRate,
  ratingLen,
  id = "",
  reviews,
  rating,
  pos = "top",
}: {
  ratingLen: number;
  avgRate: number;
  id?: string;
  rating: number[];
  pos?: string;
  reviews: reviewInterface[];
}) => {
  return (
    <div className="product-rate center">
      <>
        {[1, 2, 3, 4, 5].map((e, i) => {
          return (
            <>
              <StarIcon key={e} id={i} avgRate={avgRate} optional={id} />
            </>
          );
        })}
      </>

      <span className="shadow rate center">
        {avgRate >= 0 ? avgRate.toFixed(1) : "0"}
      </span>
      <span
        style={{
          color: "var(--green)",
          fontWeight: "bold",
          marginLeft: 6,
        }}
        className="shadow center relative"
      >
        ({ratingLen >= 0 ? ratingLen : 0})
        <RatingDetails
          pos={pos}
          arr={[...rating, ...reviews.map((e: reviewInterface) => e.rate)]}
        />
      </span>
    </div>
  );
};

export default ProductRate;
