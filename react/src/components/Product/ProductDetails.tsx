import React from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { motion } from "framer-motion";
import { btnHover } from "../../variants/globals";
import ProductRate from "./ProductRate";
import useAvg from "../../custom/useAvg";
import HeartSvg from "../widgets/HeartSvg";
interface Props {
  data: {
    title: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    rating: number[];
    setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const ProductDetails = ({
  data: { rating, title, description, category, price, stock, setShowPop },
}: Props) => {
  const parentVariant = {
    start: { x: 400, opacity: 0 },
    end: {
      x: 0,
      opacity: [0, 1],
      // transition: { delay: 0.7, duration: 0.6, type: "tween", ease: "easeOut" },
      transition: { delay: 0.7, type: "spring", stiffness: 70 },
    },
  };

  const handleshowPop = () => setShowPop(true);
  const avgRate = useAvg(rating);

  return (
    <motion.div
      className="details"
      variants={parentVariant}
      initial="start"
      animate="end"
    >
      <div className="details-top">
        <span className="category">{category}</span> <br />
        <div className="title-par">
          <h2 className="title center">
            {title}
            <HeartSvg />
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

        <div className="product-btn">
          <motion.button whileHover={btnHover} className="btn buy center">
            <span className="icon center">
              <BiPurchaseTagAlt className="icon" color="var(--wheat)" />{" "}
            </span>
            Buy Now
          </motion.button>
          <motion.button className="btn btn-cart center" whileHover={btnHover}>
            <BsFillCartPlusFill className="icon" color="var(--green)" />
            Add To cart
          </motion.button>
        </div>
      </div>
      <div className="add-rate center">
        <button className="rate" onClick={handleshowPop}>
          add rate
        </button>
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
