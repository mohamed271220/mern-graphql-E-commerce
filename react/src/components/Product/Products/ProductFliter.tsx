import React, { useState, useContext, useEffect } from "react";
import ProductRate from "../ProductRate";
import useAvg from "../../../custom/useAvg";
import ProductListHeart from "../../widgets/ProductListHeart";
import { imagesInterface } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";
import { motion, MotionProps, useAnimate } from "framer-motion";
import { viewFilterContext } from "./Products";
type Props = {
  _id: string;
  price: number;
  stock: number;
  title: string;
  state: string;
  category: string;
  images: imagesInterface[];
  rating: number[];
  index: number;
} & MotionProps;

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
  ...motionProps
}: Props) => {
  const avgRate = useAvg(rating);
  const [isFavoraited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const { productSearchWord } = useContext(viewFilterContext);

  const [ref, animate] = useAnimate();
  useEffect(() => {
    animate(
      ".product-List",
      { opacity: [0, 0.4, 1], x: [10, 5, 0], y: [5, 0] },
      { delay: index * 0.15, duration: 0.15 }
    );
  }, []);

  console.log({ productSearchWord });
  return (
    <div ref={ref}>
      <motion.section className="product-List center" {...motionProps}>
        <div className="img-par center">
          <img src={images[0].productPath} alt={title} />
        </div>
        <span className="category-card">
          {productSearchWord
            ? category
                .split(new RegExp(`(${productSearchWord})`, "gi"))
                .map((part, index) => {
                  if (part?.toLowerCase() === productSearchWord.toLowerCase()) {
                    return (
                      <span key={index} className="highlight">
                        {part}
                      </span>
                    );
                  } else {
                    return <span key={index}>{part}</span>;
                  }
                })
            : category}
        </span>
        <span className="title-product">
          {" "}
          {productSearchWord
            ? title
                .split(new RegExp(`(${productSearchWord})`, "gi"))
                .map((part, index) => {
                  if (part?.toLowerCase() === productSearchWord.toLowerCase()) {
                    return (
                      <span key={index} className="highlight">
                        {part}
                      </span>
                    );
                  } else {
                    return <span key={index}>{part}</span>;
                  }
                })
            : title}
        </span>
        <span className="price-product">${price.toFixed(2)}</span>
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
    </div>
  );
};

export default ProductFliter;
