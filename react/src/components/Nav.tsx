import React, { useRef, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import LogoSvg from "./widgets/LogoSvg";
import { AiFillHeart } from "react-icons/ai";
import useHide from "../custom/useHide";
import Favorite from "./widgets/Favorite";
import { opacityVariant, popVariant } from "../variants/globals";
import { useAppSelector } from "../custom/reduxTypes";
import ShowCount from "./widgets/Counter";
import { BsFillCartPlusFill } from "react-icons/bs";

const linksArr = [
  {
    to: "/",
    link: "Home",
  },

  {
    to: "/login",
    link: "login",
  },

  {
    to: "/signup",
    link: "sign up",
  },

  {
    to: "/about",
    link: "about",
  },
];

const Nav = () => {
  const navRef = useRef<HTMLElement | null>(null);
  const [showFav, handleShowFav, handleHideFav, toggleFav] = useHide();

  const { cart } = useAppSelector((state) => state.cart);
  const { fav } = useAppSelector((state) => state.fav);

  console.log({ cart });
  const { scrollY } = useScroll({
    target: navRef,
    offset: ["start start"],
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
          <NavLink to="/cart" className="cart-active-link">
            <BsFillCartPlusFill fontSize={"1.2rem"} />
          </NavLink>
          <ShowCount length={cart.length} />
        </motion.li>

        <motion.li
          style={{ color: showFav ? "var(--delete)" : LinkClr }}
          className="fav-par"
        >
          <ShowCount length={fav.length} />
          <AiFillHeart fontSize={"1.5rem"} onClick={toggleFav} />
          <AnimatePresence mode="wait">
            {showFav && (
              <motion.div
                key={"fav-drop"}
                variants={popVariant}
                initial="start"
                animate="end"
                exit="exit"
                className="fav-drop"
              >
                <AnimatePresence mode="wait">
                  {fav.length >= 1 ? (
                    <motion.div
                      className="center col"
                      variants={opacityVariant}
                      key={"fav-parent"}
                      initial="start"
                      exit={"exit"}
                      animate="end"
                    >
                      <AnimatePresence>
                        {fav.map((arr, index) => {
                          return <Favorite key={arr.productId} {...arr} />;
                        })}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={opacityVariant}
                      key={"no-data-fav-parent"}
                      initial="start"
                      exit={"exit"}
                      transition={{ duration: 0.4 }}
                      animate="end"
                      className="no-data-fav center"
                    >
                      nothing on your favorites
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default Nav;
