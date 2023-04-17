import React, { useState } from "react";
import ProductRate from "../ProductRate";
import useAvg from "../../../custom/useAvg";
import ProductListHeart from "../../widgets/ProductListHeart";
import { imagesInterface } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { opacityVariant } from "../../../variants/globals";
interface Props {
  _id: string;
  price: number;
  stock: number;
  title: string;
  state: string;
  category: string;
  images: imagesInterface[];
  rating: number[];
  index: number;
}

const ProductFliter = ({
  category,
  _id,
  price,
  stock,
  title,
  images,
  rating,
  state,
  index,
}: Props) => {
  const avgRate = useAvg(rating);
  console.log({ rating });
  const [isFavoraited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  const productVariant = {
    start: { opacity: 0, x: 10, y: 5 },
    end: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.section
      className="product-List center"
      initial="start"
      exit={"exit"}
      transition={{ delay: (index + 1) * 0.18, duration: 0.15 }}
      animate="end"
      variants={productVariant}
    >
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
      </div>
      <div className="product-links center">
        <button className="btn shadow product-btn">add to cart</button>

        <button
          onClick={() => navigate(`/${_id}`)}
          className="btn shadow details"
        >
          details
        </button>
      </div>
      <span className="heart-filter ">
        <ProductListHeart
          isFavoraited={isFavoraited}
          price={price}
          title={title}
          setIsFavorited={setIsFavorited}
          parentId={_id}
          images={images}
        />{" "}
      </span>
      <span className={`product-state center ${state}`}>{state}</span>
    </motion.section>
  );
};

export default ProductFliter;
