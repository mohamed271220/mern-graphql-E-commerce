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
  Variant,
  Variants,
} from "framer-motion";
import useMeasure from "react-use-measure";
import { viewContext } from "../../../../context/gridView";
import { productListContext } from "../../../../context/FilterData";
import ListCartBtn from "./ListCartBtn";
import DetailsBtn from "../../../widgets/DetailsBtn";
import { AiFillPlusSquare, AiOutlineCheck } from "react-icons/ai";
import { reviewInterface } from "../../../../interfaces/product";
import UpdateProduct from "../../../dashboard/UpdateProduct";
import Title from "../../../widgets/Title";
import { RiEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { BsInfoCircleFill, BsInfoLg } from "react-icons/bs";
import useCarousel from "../../../../custom/useCarousel";
import useIndex from "../../../../custom/useIndex";
import CompareIcons from "../../../widgets/CompareIcons";
import StyledPrice from "../../../widgets/StyledPrice";

type Props = {
  _id: string;
  price: number;
  stock: number;
  title: string;
  state: string;
  category: string;
  images: imagesInterface[];
  isDash?: boolean;
  description: string;
  rating: number[];
  index: number;
  reviews: reviewInterface[];
} & MotionProps;

const ProductFliter = ({
  isDash,
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
  const [imgInd, setimgInd] = useState(0);
  const [changeImgOnHover, setChnageImgOnHover] = useState(false);
  const { avgRate, reviewLength } = useAvg(rating, reviews);
  const [isFavoraited, setIsFavorited] = useState(false);
  const [onCart, setOnCart] = useState(false);
  const { productSearchWord } = useContext(productListContext);
  const { gridView } = useContext(viewContext);
  const [sectionRef, { width: sectionWidth }] = useMeasure();

  const [ref, animate] = useAnimate();
  const [imgVariant, dir] = useCarousel(imgInd, images.length);
  useEffect(() => {
    animate(
      ".product-List",
      { opacity: [0, 0.4, 1], x: [10, 5, 0], y: [5, 0] },
      { delay: index * 0.15, duration: 0.15 }
    );
  }, []);
  const navigat = useNavigate();
  const [convertNegativeToZero] = useIndex();

  let timer: number;
  useEffect(() => {
    if (!changeImgOnHover) return;
    timer = setTimeout(() => {
      setimgInd((cur) => convertNegativeToZero(cur + 1, images.length));
    }, 1500);

    return () => clearTimeout(timer);
  }, [changeImgOnHover, imgInd]);
  return (
    <motion.div
      ref={ref}
      onHoverStart={() => setChnageImgOnHover(true)}
      onHoverEnd={() => setChnageImgOnHover(false)}
    >
      <motion.section
        className={`product-List center ${
          gridView ? "grid col" : "list between "
        }`}
        {...motionProps}
        ref={sectionRef}
      >
        <div className={` img-par center ${gridView ? "grid" : "list"}`}>
          <AnimatePresence mode="wait">
            <motion.img
              key={images[imgInd].productPath}
              src={images[imgInd].productPath}
              alt={title}
              variants={imgVariant as Variants}
              animate="end"
              initial="start"
              exit={"exit"}
              custom={{ dir, width: 100 }}
            />
          </AnimatePresence>
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
          {isDash && (
            <span className=" center stock-par shadow">
              <span className="stock-icon box-shadow">
                <AiOutlineCheck className=" icon" />
              </span>
              <span className="stock"> {stock}</span>in stock
            </span>
          )}
          {!gridView && sectionWidth >= 400 && (
            <p style={{ fontWeight: "normal" }}>{description}</p>
          )}
          <StyledPrice price={price} />
          <span> </span>

          <div className="product-rate-filter center ">
            <ProductRate
              key={`${_id}-rate`}
              id={_id}
              avgRate={avgRate}
              ratingLen={reviewLength}
            />
          </div>
          {!isDash && (
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

              <DetailsBtn
                btn="details"
                cls="btn details center shadow gap"
                _id={_id}
                Icon={BsInfoCircleFill}
              />
            </div>
          )}
          <span className="heart-filter ">
            {!isDash ? (
              <span className="center col">
                <ProductListHeart
                  isFavoraited={isFavoraited}
                  price={price}
                  title={title}
                  setIsFavorited={setIsFavorited}
                  parentId={_id}
                  images={images}
                />
                <CompareIcons id={_id} title={title} />
              </span>
            ) : (
              <span onClick={() => navigat(`/dashboard/products/${_id}`)}>
                <Title title="edit product">
                  <RiEditLine fontSize={16} />
                </Title>
              </span>
            )}
          </span>
          <span className={`product-state center ${state}`}>{state}</span>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ProductFliter;
