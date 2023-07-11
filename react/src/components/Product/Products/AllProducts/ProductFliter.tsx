import React, { useState, useContext, useEffect } from "react";
import ProductRate from "../../../product Route/ProductRate";
import useAvg from "../../../../custom/useAvg";
import ProductListHeart from "../../../widgets/ProductListHeart";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { imagesInterface } from "../../../../interfaces/user";
import {
  AnimatePresence,
  motion,
  MotionProps,
  useAnimate,
  Variants,
} from "framer-motion";
import useMeasure from "react-use-measure";
import { viewContext } from "../../../../context/gridView";
import { productListContext } from "../../../../context/FilterData";
import ListCartBtn from "./ListCartBtn";
import DetailsBtn from "../../../widgets/DetailsBtn";
import { AiOutlineCheck } from "react-icons/ai";
import { reviewInterface } from "../../../../interfaces/product";
import Title from "../../../widgets/Title";
import { RiEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import useCarousel from "../../../../custom/useCarousel";
import useIndex from "../../../../custom/useIndex";
import CompareIcons from "../../../widgets/CompareIcons";
import StyledPrice from "../../../widgets/StyledPrice";
import { useScrollDirection } from "react-use-scroll-direction";
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
  isPending: boolean;
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
  isPending,
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

  // const { isScrollingDown } = useScrollDirection();
  const [imgRef, animateImg] = useAnimate();
  // useEffect(() => {
  //   animateImg("span", { opacity: [0, 1] }, { delay: 0.4, duration: 0.4 });
  // }, [gridView]);

  return (
    <motion.span
      ref={ref}
      onHoverStart={() => setChnageImgOnHover(true)}
      onHoverEnd={() => setChnageImgOnHover(false)}
      // initial={{ y: isScrollingDown ? -40 : 40 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: isPending ? 0.2 : 1 }}
      transition={{ duration: 0.125 }}
    >
      <motion.div
        className="par"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        onAnimationComplete={() => {
          animate(
            ".par , .product-List",
            { opacity: [0, 0.4, 1], x: [10, 5, 0], y: [5, 0] },
            { delay: index * 0.15, duration: 0.15 }
          );
        }}
      >
        <motion.section
          className={`product-List center ${
            gridView ? "grid col" : "list between "
          }`}
          {...motionProps}
          ref={sectionRef}
          initial={{ height: sectionWidth <= 400 && !gridView ? 260 : 180 }}
          animate={{ height: sectionWidth <= 400 && !gridView ? 180 : 260 }}
          transition={{ duration: 0.1, type: "tween" }}
        >
          <motion.div
            className={` img-par center ${gridView ? "grid" : "list"}`}
            key={images[imgInd].productPath}
            variants={imgVariant as Variants}
            animate="end"
            initial="start"
            exit={"exit"}
            custom={{ dir, width: 100 }}
            ref={imgRef}
          >
            <AnimatePresence mode="wait">
              <LazyLoadImage
                effect="blur"
                src={images[imgInd].productPath}
                alt={title}
              />
            </AnimatePresence>
          </motion.div>

          <div className="center col product-data">
            <h5 className="product-head-underline" style={{ marginBottom: 12 }}>
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

            <AnimatePresence mode="wait">
              {!gridView && sectionWidth >= 400 && (
                <motion.p
                  key={description}
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: { delay: 0.3, duration: 0.3 },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }}
                  style={{ fontWeight: "normal" }}
                >
                  {description}
                </motion.p>
              )}
            </AnimatePresence>
            <StyledPrice price={price} />
            <span> </span>

            <div className="product-rate-filter center ">
              <ProductRate
                key={`${_id}-rate`}
                id={_id}
                avgRate={avgRate}
                ratingLen={reviewLength}
                reviews={reviews}
                rating={rating}
                pos={"bottom"}
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
                    <RiEditLine fontSize={16} color="var(--third)" />
                  </Title>
                </span>
              )}
            </span>
            <span className={`product-state center ${state}`}>{state}</span>
          </div>
        </motion.section>
      </motion.div>
    </motion.span>
  );
};

export default ProductFliter;
