import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
const FooterLinks = () => {
  const linksArr = ["dashboard", "about", "faq"];
  return (
    <div className="footer-important-links footer-links ">
      <h3 className="underline header footer-head ">links</h3>
      <motion.span whileHover={{ x: 10 }}>
        <Link to="banner" smooth style={{ cursor: "pointer" }}>
          home
        </Link>
      </motion.span>
      {linksArr.map((e, i) => {
        return (
          <motion.span whileHover={{ x: 10 }} key={i}>
            <NavLink to={`/${e}`}>{e}</NavLink>
          </motion.span>
        );
      })}
    </div>
  );
};

export default FooterLinks;
