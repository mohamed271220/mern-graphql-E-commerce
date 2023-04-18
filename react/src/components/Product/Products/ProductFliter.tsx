import React, { useState, useEffect } from "react";
import ProductRate from "../ProductRate";
import useAvg from "../../../custom/useAvg";
import ProductListHeart from "../../widgets/ProductListHeart";
import { imagesInterface } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";
import { motion, MotionProps, useAnimate } from "framer-motion";
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

  const [ref, animate] = useAnimate();
  useEffect(() => {
    animate(
      ".product-List",
      { opacity: [0, 0.4, 1], x: [10, 5, 0], y: [5, 0] },
      { delay: index * 0.15, duration: 0.15 }
    );
  }, []);
  return (
    <div ref={ref}>
      <motion.section
        // ref={ref}
        // animate={controls}
        className="product-List center"
        // initial="start"
        // exit={"exit"}
        // transition={{
        //   delay: (index + 1) * 0.18,
        //   duration: 0.15,
        //   type: "tween",
        //   // type: "spring",
        //   ease: "easeInOut",
        // }}
        // animate="end"
        // variants={productVariant}
        {...motionProps}
      >
        <div className="img-par center">
          <img src={images[0].productPath} alt={title} />
        </div>
        <span className="category-card">{category}</span>
        <span className="title-product">{title}</span>
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
