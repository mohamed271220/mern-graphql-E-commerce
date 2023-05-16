import React from "react";
import { motion } from "framer-motion";
import { opacityVariant } from "../../variants/globals";
import { Link } from "react-scroll";
import OpacityBtn from "../widgets/OpacityBtn";

interface Props {
  header: string;
  clr: string;
  button: string;
  slogan: string;
  to: string;
  fn: () => void;
}
const BannerText = ({ fn, header, clr, button, to, slogan }: Props) => {
  return (
    <motion.div
      className="banner-content center"
      initial="start"
      animate="end"
      transition={{ duration: 0.6, delay: 0.4 }}
      variants={opacityVariant}
    >
      <h1 style={{ color: `${clr}` }}>{header}</h1>

      <p>{slogan}</p>

      <div className="product-links center">
        <Link to={to} smooth className="btn banner-btn" style={{ padding: 0 }}>
          <motion.span
            style={{
              background: `linear-gradient(30deg, var(--wheat), ${clr})`,
              cursor: "pointer",
              borderRadius: "4px 10px",
            }}
          >
            <OpacityBtn fn={fn} btn={button} cls="btn banner-btn transparent" />
          </motion.span>
        </Link>
        <button className="btn banner-btn  about">About us</button>
      </div>
    </motion.div>
  );
};

export default BannerText;
