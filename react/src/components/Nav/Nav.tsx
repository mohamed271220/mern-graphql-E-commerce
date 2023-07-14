import React, { useRef, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useScroll,
  useTransform,
  motion,
  
} from "framer-motion";
import LogoSvg from "../widgets/LogoSvg";

import { isAuthContext } from "../../context/isAuth";

import ThemeToggle from "../widgets/ThemeToggle";
import { themeContext } from "../../context/ThemContext";
import NavLinks from "./NavLinks";
import ProdouctFeaturesLinks from "./ProdouctFeaturesLinks";
import useIsMobile from "../../custom/useIsMobile";
import LinksAside from "./LinksAside";

const Nav = () => {
  const { isAuth } = useContext(isAuthContext);
  const { theme } = useContext(themeContext);
  const navRef = useRef<HTMLElement | null>(null);

  const { scrollY } = useScroll({
    target: navRef,
  });
  const navClr = useTransform(
    scrollY,
    [0, 0.5],
    [theme === "light" ? "#fff" : "#000", theme === "dark" ? "#fff" : "#000"]
  );

  const LinkClr = useTransform(
    scrollY,
    [0, 0.5],
    [theme === "dark" ? "#fff" : "#000", theme === "light" ? "#fff" : "#000"]
  );
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  useEffect(() => {
    if (location.pathname.startsWith("/dashboard") && isAuth) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location, isAuth]);

  const { isMobile } = useIsMobile();
  return (
    <>
      {showNav && (
        <motion.nav
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.4 }}
          ref={navRef}
          style={{ background: navClr }}
        >
          <Link to="/" className="logo center">
            <LogoSvg />
          </Link>

          <div className="links-par">
            {!isMobile && (
              <div className="e-commerce-features center">
                <>
                  <NavLinks LinkClr={LinkClr} />
                </>
              </div>
            )}
            <ProdouctFeaturesLinks LinkClr={LinkClr} />
            <div className="nav-features">
              <ThemeToggle navClr={navClr} linkClr={LinkClr} />
              {isMobile && <LinksAside />}
            </div>
          </div>
        </motion.nav>
      )}
    </>
  );
};

export default Nav;
