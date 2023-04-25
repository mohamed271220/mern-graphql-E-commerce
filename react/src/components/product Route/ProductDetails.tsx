import React, { useEffect, useState, useContext } from "react";
import { BiCommentEdit, BiPurchaseTagAlt, BiShow } from "react-icons/bi";

import { AiFillPlusSquare, AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { btnHover } from "../../variants/globals";
import useAvg from "../../custom/useAvg";
import { useAppSelector } from "../../custom/reduxTypes";
import HeartSvgProduct from "../../custom SVGs/HeartSvgProduct";
import { productContext } from "./Product";
import usePathAndId from "../../custom/usePathAndId";
import ProductRate from "./ProductRate";
import CartBtn from "../widgets/CartBtn";
import AddReview from "./AddReview";
import Title from "../widgets/Title";
import { isAuthContext } from "../../context/isAuth";

interface Props {
  setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductDetails = ({ setShowPop }: Props) => {
  const {
    images,
    bigImgInd,
    _id,
    rating,
    title,
    description,
    category,
    price,
    stock,
    addReview,
  } = useContext(productContext);
  const parentVariant = {
    start: { x: 400, opacity: 0 },
    end: {
      x: 0,
      opacity: [0, 1],
      transition: { delay: 0.7, type: "spring", stiffness: 70 },
    },
  };

  const { avgRate, reviewLength } = useAvg(rating, addReview);

  const handleshowPop = () => setShowPop(true);
  const [isFavoraited, setIsFavorited] = useState(false);

  const [id] = usePathAndId(images, bigImgInd);
  const { cart } = useAppSelector((state) => state.cart);
  const [onCart, setOnCart] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const [showAddRate, setShowAddRate] = useState(false);
  const { userId } = useContext(isAuthContext);
  const [rateIndex, setRateIndex] = useState(-1);

  const toggleSHowAddRate = () => setShowAddRate(!showAddRate);
  useEffect(() => {
    const check = cart.some((e) => e.productId === id);
    if (check) {
      setOnCart(true);
    } else {
      setOnCart(false);
    }
  }, [cart, id]);

  useEffect(() => {
    const check = addReview.find((e) => e.userId === userId);
    if (check) {
      setHasReview(true);

      setRateIndex(check.rate - 1);
    } else {
      setHasReview(false);
    }
  }, [addReview]);
  return (
    <motion.div
      className="details"
      variants={parentVariant}
      initial="start"
      animate="end"
    >
      <div className="details-top">
        <h3
          style={{ margin: 0, color: "var(--twitter)" }}
          className="header underline "
        >
          {category}
        </h3>
        <br />
        <div className="title-par">
          <h2 className="title  center">
            {title}
            <span className="center heart-par">
              <HeartSvgProduct
                isFavoraited={isFavoraited}
                setIsFavorited={setIsFavorited}
              />
            </span>
          </h2>

          <span className=" center stock-par shadow">
            <span className="stock-icon box-shadow">
              <AiOutlineCheck className=" icon" />
            </span>
            <span className="stock"> {stock}</span>in stock
          </span>
        </div>
        <div className="center gap" style={{ justifyContent: "flex-start" }}>
          <ProductRate
            key={`${description}-rate`}
            avgRate={avgRate}
            ratingLen={reviewLength}
          />
          <Title title="show all reviews">
            <BiShow fontSize={12} color="black" onClick={handleshowPop} />
          </Title>
          <AnimatePresence>
            {!hasReview ? (
              <Title title="add review" key={"add-review"}>
                <AiFillPlusSquare
                  color="var(--green)"
                  fontSize={12}
                  onClick={toggleSHowAddRate}
                />
              </Title>
            ) : (
              <Title title="edit your review" key={"has-review"}>
                <BiCommentEdit
                  fontSize={12}
                  color="var(--green)"
                  onClick={toggleSHowAddRate}
                />
              </Title>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="details-bottom">
        <span className="value price">
          <span style={{ marginRight: 6, color: "var(--green)" }}>$</span>
          {price.toFixed(2)}
        </span>
        <p>{description}</p>

        <div className="hr"></div>

        <div className="product-btn  ">
          <motion.button whileHover={btnHover} className="btn buy center">
            <span className="icon center">
              <BiPurchaseTagAlt className="icon" color="var(--wheat)" />{" "}
            </span>
            Buy Now
          </motion.button>

          <AnimatePresence mode="wait">
            {!onCart ? (
              <CartBtn id={_id} key={"add-to-cart"} btn="add to cart" />
            ) : (
              <CartBtn
                id={_id}
                btn="remove from cart"
                key={"remove-from-cart"}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showAddRate && (
          <AddReview
            setShowAddRate={setShowAddRate}
            key={"add-rate-pop"}
            _id={_id}
            rateIndex={rateIndex}
            setRateIndex={setRateIndex}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetails;
