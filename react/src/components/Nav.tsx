import React, { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useScroll, useTransform, motion } from "framer-motion";
import LogoSvg from "./widgets/LogoSvg";

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
  const { scrollY } = useScroll({
    target: navRef,
    offset: ["start start"],
  });
  const navClr = useTransform(
    scrollY,
    [0, 0.1, 0.4],
    ["var(--white)", "rgb(1,5,5)", "#000"]
  );

  return (
    <motion.nav ref={navRef} style={{ background: navClr }}>
      <Link to="/" className="logo">
        <LogoSvg />
      </Link>

      <ul className="links center">
        {linksArr.map(({ to, link }, i) => {
          return (
            <li className="center" key={i}>
              <NavLink to={to}>{link} </NavLink>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

export default Nav;
