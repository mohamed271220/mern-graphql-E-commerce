import React from "react";
import ProductRate from "../ProductRate";
import useAvg from "../../../custom/useAvg";
import HeartSvg from "../../widgets/HeartSvg";
interface Props {
  _id: string;
  price: number;
  stock: number;
  title: string;
  category: string;
  images: { productPath: string }[];
  rating: number[];
}

const ProductFliter = ({
  category,
  _id,
  price,
  stock,
  title,
  images,
  rating,
}: Props) => {
  const avgRate = useAvg(rating);

  return (
    <section className="product-List center">
      <div className="img-par center">
        <img src={images[0].productPath} alt={title} />
      </div>
      <span className="category-card">{category}</span>
      <span className="title-product">{title}</span>
      <span className="price-product">${price}</span>
      <span> </span>

      <div className="product-rate-filter center ">
        <ProductRate
          key={`${_id}-rate`}
          avgRate={avgRate}
          ratingLen={rating.length}
        />
        <button className="btn shadow">reviews</button>
      </div>
      <span className="heart-filter ">
        <HeartSvg />
      </span>
      <button className="btn product-btn">add to cart</button>
    </section>
  );
};

export default ProductFliter;
