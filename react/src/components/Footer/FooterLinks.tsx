import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import payImg from "../../assets/Images/pay.png";
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
      <div
        style={{
          height: 140,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "column",
          gap: 5,
        }}
        className="pay-par"
      >
        <img src={payImg} />
        <div style={{ color: "var(--third)", opacity: 0.6 }}>
          Secured Payment Gateways
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
