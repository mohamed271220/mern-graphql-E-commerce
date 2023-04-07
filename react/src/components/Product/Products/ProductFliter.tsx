import React, { useState } from "react";
import ProductRate from "../ProductRate";
import useAvg from "../../../custom/useAvg";
import ProductListHeart from "../../widgets/ProductListHeart";
import { imagesInterface } from "../../interfaces/user";
interface Props {
  _id: string;
  price: number;
  stock: number;
  title: string;
  category: string;
  images: imagesInterface[];
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
  const [isFavoraited, setIsFavorited] = useState(false);

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
        <ProductListHeart
          isFavoraited={isFavoraited}
          price={price}
          title={title}
          setIsFavorited={setIsFavorited}
          images={images}
        />{" "}
      </span>
      <button className="btn product-btn">add to cart</button>
    </section>
  );
};

export default ProductFliter;
