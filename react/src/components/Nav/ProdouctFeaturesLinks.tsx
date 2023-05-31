import { motion, AnimatePresence, MotionValue } from "framer-motion";
import React, { useContext, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoGitCompareSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import isAuth, { isAuthContext } from "../../context/isAuth";
import { opacityVariant } from "../../variants/globals";
import FadeElement from "../widgets/FadeElement";
import NavImg from "../widgets/NavImg";
import ShowCount from "../widgets/showCounter";
import WishList from "./WishList";
import Title from "../widgets/Title";
import { useAppSelector } from "../../custom/reduxTypes";
interface Props {
  LinkClr?: MotionValue | string;
}
const ProdouctFeaturesLinks = ({ LinkClr = "white" }: Props) => {
  const { isAuth } = useContext(isAuthContext);

  const [showFav, setShowFav] = useState(false);
  const { cart } = useAppSelector((state) => state.cart);
  const { compare } = useAppSelector((state) => state.compare);
  const { fav } = useAppSelector((state) => state.fav);
  return (
    <ul>
      <NavLink to="/cart" className="cart-active-link ">
        <motion.li id="cart-link-par" style={{ color: LinkClr }}>
          <Title title="go to your cart">
            <ShowCount length={cart.length} />
            <BsFillCartPlusFill fontSize={"1.2rem"} />
          </Title>
        </motion.li>
      </NavLink>
      <NavLink to="/compare" className="cart-active-link ">
        <motion.li id="cart-link-par" style={{ color: LinkClr }}>
          <Title title="compare products list">
            <ShowCount length={compare.length} />
            <IoGitCompareSharp fontSize={"1.2rem"} />
          </Title>
        </motion.li>
      </NavLink>

      <motion.li
        style={{ color: showFav ? "var(--delete)" : LinkClr }}
        className="fav-par center"
      >
        <WishList showFav={showFav} setter={setShowFav} />
        <Title title={!showFav ? "show your wishlist" : "hide your wishList"}>
          <ShowCount length={fav.length} />

          <AiFillHeart fontSize={"1.2rem"} onClick={() => setShowFav(true)} />
        </Title>
      </motion.li>
      <motion.li>
        <AnimatePresence mode="wait">
          {isAuth ? (
            <FadeElement cls="" key={"profile-image"}>
              <NavImg />
            </FadeElement>
          ) : (
            <motion.span
              key={"login"}
              variants={opacityVariant}
              transition={{ duration: 0.4 }}
              initial="start"
              animate="end"
              exit="exit"
              style={{ color: LinkClr }}
            >
              <NavLink to={"/login"}>log in</NavLink>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.li>
    </ul>
  );
};

export default ProdouctFeaturesLinks;
