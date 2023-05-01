import React from "react";
import { imagesInterface } from "../../interfaces/user";
import { reviewInterface } from "../../interfaces/product";
import ProductRate from "../product Route/ProductRate";
import useAvg from "../../custom/useAvg";

interface Props {
  images: imagesInterface[];
  reviews: reviewInterface[];
  rating: number[];
  title: string;
  price: number;
  description: string;
}

const SelectedProductData = ({
  images,
  rating,
  reviews,
  title,
  description,
  price,
}: Props) => {
  const { avgRate, reviewLength } = useAvg(rating, reviews);

  return (
    <div className="w-100 center col selected-pro-data">
      <img src={images[0]?.productPath} alt={title} />
      <span>{title}</span>
      <span>{price}</span>
      <ProductRate
        key={`${title}-rate`}
        avgRate={avgRate}
        ratingLen={reviewLength}
      />
      <p>{description}</p>
    </div>
  );
};

export default SelectedProductData;
