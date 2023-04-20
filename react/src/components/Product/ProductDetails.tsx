import React, { useEffect, useState, useContext } from "react";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { btnHover } from "../../variants/globals";
import ProductRate from "./ProductRate";
import useAvg from "../../custom/useAvg";
import { useMutation } from "@apollo/client";
import {
  Add_To_Cart,
  Add_To_Fav,
  REMOVE_FROM_FAV,
} from "../../graphql/mutations/user";
import { useAppDispatch, useAppSelector } from "../../custom/reduxTypes";
import { favInterface } from "../interfaces/user";
import { addToFavRedux, removeFromFavRedux } from "../../redux/favSlice";
import HeartSvgProduct from "./HeartSvgProduct";
import CartButton from "./CartButton";
import { productContext } from "./Product";
import usePathAndId from "../../custom/usePathAndId";
import Remove_From_Cart_Btn from "./Remove-From-Cart_Btn";
import ProductListHeart from "../widgets/ProductListHeart";
interface Props {
  data: {
    title: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    rating: number[];
    setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
    _id: string;
  };
}

const ProductDetails = ({
  data: { _id, rating, title, description, category, price, stock, setShowPop },
}: Props) => {
  const parentVariant = {
    start: { x: 400, opacity: 0 },
    end: {
      x: 0,
      opacity: [0, 1],
      transition: { delay: 0.7, type: "spring", stiffness: 70 },
    },
  };

  const dispatch = useAppDispatch();
  const handleshowPop = () => setShowPop(true);
  const avgRate = useAvg(rating);
  const [isFavoraited, setIsFavorited] = useState(false);
  const { images, bigImgInd } = useContext(productContext);
  const [id] = usePathAndId(images, bigImgInd);
  const { cart } = useAppSelector((state) => state.cart);
  const [onCart, setOnCart] = useState(false);

  useEffect(() => {
    const check = cart.some((e) => e.productId === id);
    console.log({ id });
    if (check) {
      setOnCart(true);
    } else {
      setOnCart(false);
    }
  }, [cart, id]);

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
          className="header underline"
        >
          {category}
        </h3>{" "}
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
        <>
          <ProductRate
            key={`${description}-rate`}
            avgRate={avgRate}
            ratingLen={rating.length}
          />
        </>
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
              <CartButton key={"CartButton"} />
            ) : (
              <Remove_From_Cart_Btn
                key={"Remove_From_Cart_Btn"}
                id={id}
                content={"remove from cart"}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="add-rate center">
        <button className="rate">add rate</button>
        <button
          className="review"
          onClick={() => {
            handleshowPop();
          }}
        >
          see all review
        </button>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
