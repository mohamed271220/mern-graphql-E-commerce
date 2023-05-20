import React from "react";
import OpacityBtn from "./OpacityBtn";
import { useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import FadeElement from "./FadeElement";
const ContinueShopping = () => {
  const navigate = useNavigate();
  const variant = {
    start: { opacity: 0 },
    end: {
      opacity: 1,
      transition: { delay: 3, duration: 0.3, when: "beforeChildren" },
    },
    exit: { opacity: 0 },
  };
  return (
    <motion.div variants={variant} initial="start" animate="end" exit="exit">
      <FadeElement cls="">
        <OpacityBtn
          fn={() => {
            navigate("/");
          }}
          btn="continue shopping"
          cls="btn center gap  continue-shopping"
          Icon={BiLeftArrowAlt}
        />
      </FadeElement>
    </motion.div>
  );
};

export default ContinueShopping;
