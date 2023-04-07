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
import { popVariant } from "../variants/globals";
import { isAuthContext } from "../context/isAuth";

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

  const { favArr } = useContext(isAuthContext);

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
              <NavLink to={to}>{link} </NavLink>
            </motion.li>
          );
        })}
        <motion.li
          style={{ color: showFav ? "var(--delete)" : LinkClr }}
          className="fav-par"
        >
          <AiFillHeart fontSize={"1.5rem"} onClick={toggleFav} />
          <AnimatePresence>
            {showFav && (
              <motion.div
                key={"fav-drop"}
                variants={popVariant}
                initial="start"
                animate="end"
                exit="exit"
                className="fav-drop"
              >
                {favArr.map((arr, index) => {
                  return <Favorite key={arr._id} {...arr} />;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default Nav;
