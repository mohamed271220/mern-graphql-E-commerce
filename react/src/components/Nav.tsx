import React, { useRef, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useScroll, useTransform, motion } from "framer-motion";
import LogoSvg from "./widgets/LogoSvg";
import { AiFillHeart } from "react-icons/ai";
import useHide from "../custom/useHide";
import { useAppSelector } from "../custom/reduxTypes";
import ShowCount from "./widgets/showCounter";
import { BsFillCartPlusFill } from "react-icons/bs";
import { linksArr } from "../arries.js";
import Title from "./widgets/Title";
import WishList from "./WishList";

const Nav = () => {
  const navRef = useRef<HTMLElement | null>(null);
  const [showFav, handleShowFav, handleHideFav, toggleFav] = useHide();

  const { cart } = useAppSelector((state) => state.cart);
  const { fav } = useAppSelector((state) => state.fav);

  const { scrollY } = useScroll({
    target: navRef,
  });
  const navClr = useTransform(
    scrollY,
    [0, 0.1, 0.4],
    ["var(--white)", "rgb(1,5,5)", "#000"]
  );

  const LinkClr = useTransform(
    scrollY,
    [0, 0.1],
    ["#000", "rgb(247, 246, 246)"]
  );
  return (
    <motion.nav ref={navRef} style={{ background: navClr }}>
      <Link to="/" className="logo">
        <LogoSvg />
      </Link>

      <ul className="links center">
        {linksArr.map(({ to, link }, i) => {
          return (
            <motion.li className="center" key={i} style={{ color: LinkClr }}>
              <NavLink className="link" to={to}>
                {link}{" "}
              </NavLink>
            </motion.li>
          );
        })}
        <motion.li id="cart-link-par" style={{ color: LinkClr }}>
          {/* <Title title="go to your cart"> */}
          <NavLink to="/cart" className="cart-active-link ">
            <ShowCount length={cart.length} />
            <BsFillCartPlusFill fontSize={"1.2rem"} />
          </NavLink>
          {/* </Title> */}
        </motion.li>

        <motion.li
          style={{ color: showFav ? "var(--delete)" : LinkClr }}
          className="fav-par"
        >
          <WishList showFav={showFav} />
          <Title title={!showFav ? "show your wishlist" : "hide your wishList"}>
            <ShowCount length={fav.length} />

            <AiFillHeart fontSize={"1.5rem"} onClick={toggleFav} />
          </Title>
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default Nav;
