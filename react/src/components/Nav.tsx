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
import ShowCount from "./widgets/showCounter";
import { BsFillCartPlusFill } from "react-icons/bs";
import GridViewContext from "../context/gridView";
import { linksArr } from "../arries.js";
import Title from "./widgets/Title";
import useShowTitle from "../custom/useShowTitle";

const Nav = () => {
  const navRef = useRef<HTMLElement | null>(null);
  const [showFav, handleShowFav, handleHideFav, toggleFav] = useHide();

  const [showCartTitle, ShowCartFn, hideCartFn] = useShowTitle();
  const [showFavTitle, ShowFavFn, hideFavFn] = useShowTitle();

  const { cart } = useAppSelector((state) => state.cart);
  const { fav } = useAppSelector((state) => state.fav);

  console.log({ cart });
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
        <motion.li
          id="cart-link-par"
          style={{ color: LinkClr }}
          onHoverStart={ShowCartFn}
          onHoverEnd={hideCartFn}
        >
          <NavLink to="/cart" className="cart-active-link title-par">
            <BsFillCartPlusFill fontSize={"1.2rem"} />
            <Title title="go to your cart" bool={showCartTitle} />
          </NavLink>
          <ShowCount length={cart.length} />
        </motion.li>

        <motion.li
          style={{ color: showFav ? "var(--delete)" : LinkClr }}
          className="fav-par title-par"
        >
          <ShowCount length={fav.length} />
          <motion.span
            className="title-par"
            onHoverStart={ShowFavFn}
            onHoverEnd={hideFavFn}
          >
            <AiFillHeart fontSize={"1.5rem"} onClick={toggleFav} />
            <Title bool={showFavTitle} title="show your wishlist" />
          </motion.span>

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
