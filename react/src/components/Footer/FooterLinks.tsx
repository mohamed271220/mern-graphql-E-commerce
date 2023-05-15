import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

const FooterLinks = () => {
  const linksArr = ["dashboard", "about", "faq"];
  return (
    <div className="footer-important-links footer-links ">
      <h3 className="underline header footer-head ">links</h3>
      <Link to="banner" smooth style={{ cursor: "pointer" }}>
        home
      </Link>
      {linksArr.map((e, i) => {
        return (
          <NavLink to={`/${e}`} key={i}>
            {" "}
            {e}
          </NavLink>
        );
      })}
    </div>
  );
};

export default FooterLinks;
