import React, { useState, useContext, useEffect } from "react";
import ProductRate from "../../../product Route/ProductRate";
import useAvg from "../../../../custom/useAvg";
import ProductListHeart from "../../../widgets/ProductListHeart";
import { imagesInterface } from "../../../../interfaces/user";
import {
  AnimatePresence,
  motion,
  MotionProps,
  useAnimate,
} from "framer-motion";
import useMeasure from "react-use-measure";
import { viewContext } from "../../../../context/gridView";
import { productListContext } from "../../../../context/FilterData";
import ListCartBtn from "./ListCartBtn";
import DetailsBtn from "../../../widgets/DetailsBtn";
import { AiFillPlusSquare } from "react-icons/ai";
import { reviewInterface } from "../../../../interfaces/product";

type Props = {
  _id: string;
  price: number;
  stock: number;
  title: string;
  state: string;
  category: string;
  images: imagesInterface[];
  description: string;
  rating: number[];
  index: number;
  reviews: reviewInterface[];
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
  description,
  reviews,
  ...motionProps
}: Props) => {
  const { avgRate, reviewLength } = useAvg(rating, reviews);
  const [isFavoraited, setIsFavorited] = useState(false);
  const [onCart, setOnCart] = useState(false);
  const { productSearchWord } = useContext(productListContext);
  const { gridView } = useContext(viewContext);
  const [sectionRef, { width: sectionWidth }] = useMeasure();

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
        className={`product-List center ${
          gridView ? "grid col" : "list between "
        }`}
        {...motionProps}
        ref={sectionRef}
      >
        <div className={` img-par center ${gridView ? "grid" : "list"}`}>
          <img src={images[0].productPath} alt={title} />
        </div>
        <div className="center col">
          <h5 className="header underline product-head-underline">
            {productSearchWord
              ? category
                  .split(new RegExp(`(${productSearchWord})`, "gi"))
                  .map((part, index) => {
                    if (
                      part?.toLowerCase() === productSearchWord.toLowerCase()
                    ) {
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
          </h5>
          <span className="title-product">
            {" "}
            {productSearchWord
              ? title
                  .split(new RegExp(`(${productSearchWord})`, "gi"))
                  .map((part, index) => {
                    if (
                      part?.toLowerCase() === productSearchWord.toLowerCase()
                    ) {
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
          {!gridView && sectionWidth >= 400 && (
            <p style={{ fontWeight: "normal" }}>{description}</p>
          )}
          <span className="price-product">${price.toFixed(2)}</span>
          <span> </span>

          <div className="product-rate-filter center ">
            <ProductRate
              key={`${_id}-rate`}
              id={_id}
              avgRate={avgRate}
              ratingLen={reviewLength}
            />
          </div>
          <div className="product-links center">
            <AnimatePresence mode="wait">
              {!onCart ? (
                <ListCartBtn
                  key={"ListCartBtn"}
                  setOnCart={setOnCart}
                  price={price}
                  title={title}
                  parentId={_id}
                  images={images}
                  btn="add to cart"
                />
              ) : (
                <ListCartBtn
                  key={"removeListCartBtn"}
                  setOnCart={setOnCart}
                  price={price}
                  title={title}
                  parentId={_id}
                  images={images}
                  btn="remove from cart"
                />
              )}
            </AnimatePresence>

            <DetailsBtn btn="details" cls="btn details shadow" _id={_id} />
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
        </div>
      </motion.section>
    </div>
  );
};

export default ProductFliter;
