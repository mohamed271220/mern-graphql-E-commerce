import React from "react";
import { motion } from "framer-motion";
import { btnHover, btnTap, opacityVariant } from "../../variants/globals";
import { Link } from "react-scroll";

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
      transition={{ duration: 0.6, delay: 0.2 }}
      variants={opacityVariant}
      //   style={{ background: "green" }}
    >
      <h1 style={{ color: `${clr}` }}>{header}</h1>

      <p>{slogan}</p>

      <div className="product-links center">
        <motion.div
          className="btn"
          whileHover={btnHover}
          whileTap={btnTap}
          style={{ padding: "4px 0" }}
        >
          <Link
            to={to}
            smooth
            style={{
              background: `linear-gradient(30deg, var(--wheat), ${clr})`,
              cursor: "pointer",
            }}
            className="btn "
            onClick={fn}
          >
            {button}
          </Link>
        </motion.div>
        <button className="btn  about">About us</button>
      </div>
    </motion.div>
  );
};

export default BannerText;
