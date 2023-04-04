import React, { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { btnHover, opacityVariant } from "../../variants/globals";
import ProductRate from "./ProductRate";
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
  data: { title, description, category, price, stock, setShowPop },
}: Props) => {
  const [svgRef, svgAnimate] = useAnimate();

  const [addToFavorate, setAddToFavorite] = useState(false);

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

            <span className="heart-parent ">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                ref={svgRef}
                onClick={() => {
                  setAddToFavorite(!addToFavorate);
                  svgAnimate(
                    "path",
                    {
                      pathLength: !addToFavorate ? [0, 1] : [1, 0],
                      pathOffset: !addToFavorate ? [0.4, 0] : [0, 0.4],
                      stroke: "red",
                    },
                    { duration: 1 }
                  );
                }}
              >
                <path
                  stroke="none"
                  d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
                />
              </svg>
            </span>
          </h2>

          <span className="center stock-par">
            {/* <FaCheckCircle className="icon" /> */}
            <span className="stock-icon">
              <AiOutlineCheck className="icon" />
            </span>
            <span className="stock"> {stock}</span>in stock
          </span>
        </div>
        <>
          <ProductRate />

          {/* <AnimatePresence mode="wait">
              {!addToFavorate ? (
                <motion.span
                  variants={opacityVariant}
                  initial="start"
                  animate="end"
                  exit="exit"
                  key={"add to favorite"}
                  transition={{ duration: 0.8 }}
                >
                  add to favorite
                </motion.span>
              ) : (
                <motion.span
                  variants={opacityVariant}
                  initial="start"
                  animate="end"
                  key={"remove from favorites"}
                  exit="exit"
                  transition={{ duration: 0.8 }}
                >
                  remove from favorites
                </motion.span>
              )}
            </AnimatePresence> */}
        </>
      </div>

      <div className="details-bottom">
        <span className="value price">
          <span style={{ marginRight: 6, color: "var(--green)" }}>$</span>
          {/* <span className="colon">:</span> */}
          {price.toFixed(2)}
          {/* </span> */}
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
            console.log("clicked");
          }}
        >
          see all review
        </button>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
