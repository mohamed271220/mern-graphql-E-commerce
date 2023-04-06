import React, { useEffect, useState, useContext } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { motion } from "framer-motion";
import { btnHover } from "../../variants/globals";
import ProductRate from "./ProductRate";
import useAvg from "../../custom/useAvg";
import HeartSvg from "../widgets/HeartSvg";
import { useMutation } from "@apollo/client";
import {
  Add_To_Cart,
  Add_To_Fav,
  REMOVE_FROM_FAV,
} from "../../graphql/mutations/user";
import { useAppDispatch, useAppSelector } from "../../custom/reduxTypes";
import { favInterface } from "../interfaces/user";
import { addToFavRedux, removeFromFavRedux } from "../../redux/cartSlice";
import Cookies from "js-cookie";
import { isAuthContext } from "../../context/isAuth";
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
      // transition: { delay: 0.7, duration: 0.6, type: "tween", ease: "easeOut" },
      transition: { delay: 0.7, type: "spring", stiffness: 70 },
    },
  };

  // const { fav: favContext } = useContext(isAuthContext);

  // const { fav: favArr } = useAppSelector((state) => state.fav);
  const dispatch = useAppDispatch();
  // console.log({ favArr });

  const handleshowPop = () => setShowPop(true);
  const avgRate = useAvg(rating);

  const [addToCart, { data }] = useMutation(Add_To_Cart);
  // const [addToFav, { data: addfavData }] = useMutation(Add_To_Fav);
  // const [RemoveFromFav, { data: removefavData }] = useMutation(REMOVE_FROM_FAV);

  const [isFavoraited, setIsFavorited] = useState(false);

  // useEffect(() => {
  //   if (favArr.length > 0) {
  //     const check = favArr.some((e: favInterface) => _id == e.productId);
  //     console.log({ check, favArr, _id });
  //     if (check) {
  //       setIsFavorited(true);
  //     } else {
  //       setIsFavorited(false);
  //     }
  //   }
  // }, [favContext]);

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
            <span
              className="center heart-par"
              // onClick={async () => {
              //   const userId = Cookies.get("user-id");
              //   if (isFavoraited) {
              //     const res = await RemoveFromFav({
              //       variables: {
              //         userId,
              //         productId: _id,
              //       },
              //     });
              //     console.log(res);

              //     dispatch(removeFromFavRedux(_id));
              //   } else {
              //     const res = await addToFav({
              //       variables: {
              //         userId,
              //         productId: _id,
              //       },
              //     });
              //     console.log(res);
              //     dispatch(addToFavRedux(_id));
              //   }
              // }}
            >
              <HeartSvg
                isFavoraited={isFavoraited}
                setIsFavorited={setIsFavorited}
                _id={_id}
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

        <div className="product-btn">
          <motion.button whileHover={btnHover} className="btn buy center">
            <span className="icon center">
              <BiPurchaseTagAlt className="icon" color="var(--wheat)" />{" "}
            </span>
            Buy Now
          </motion.button>
          <motion.button
            className="btn btn-cart center"
            whileHover={btnHover}
            onClick={async () => {
              const res = await addToCart({
                variables: {
                  userId: "642eff1eae1b178cacf820c5",
                  productId: _id,
                },
              });

              console.log(res);
            }}
          >
            <BsFillCartPlusFill className="icon" color="var(--green)" />
            Add To cart
          </motion.button>
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
