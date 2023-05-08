import React, { useRef, useContext, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import LogoSvg from "./widgets/LogoSvg";
import { AiFillHeart } from "react-icons/ai";
import useHide from "../custom/useHide";
import { useAppSelector } from "../custom/reduxTypes";
import ShowCount from "./widgets/showCounter";
import { BsFillCartPlusFill } from "react-icons/bs";
import { linksArr } from "../arries.js";
import Title from "./widgets/Title";
import WishList from "./WishList";
import { isAuthContext } from "../context/isAuth";
import NavImg from "./widgets/NavImg";
import { opacityVariant } from "../variants/globals";
import { IoGitCompareSharp } from "react-icons/io5";
import FadeElement from "./widgets/FadeElement";
import ThemContext, { themeContext } from "../context/ThemContext";

const Nav = () => {
  const { isAuth } = useContext(isAuthContext);
  const { toggleTheme, theme } = useContext(themeContext);
  const navRef = useRef<HTMLElement | null>(null);
  const [showFav, handleShowFav, handleHideFav, toggleFav] = useHide();
  const { cart } = useAppSelector((state) => state.cart);
  const { compare } = useAppSelector((state) => state.compare);
  const { fav } = useAppSelector((state) => state.fav);

  const { scrollY } = useScroll({
    target: navRef,
  });
  const navClr = useTransform(
    scrollY,
    [0, 0.5],
    ["var(--main)", theme === "dark" ? "#fff" : "#000"]
  );

  const LinkClr = useTransform(
    scrollY,
    [0, 0.5],
    ["var(--secondary)", theme === "light" ? "#fff" : "#000"]
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
          className="fav-par"
        >
          <WishList showFav={showFav} />
          <Title title={!showFav ? "show your wishlist" : "hide your wishList"}>
            <ShowCount length={fav.length} />

            <AiFillHeart fontSize={"1.2rem"} onClick={toggleFav} />
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
        <button onClick={toggleTheme}>toggle</button>
      </ul>
    </motion.nav>
  );
};

export default Nav;
