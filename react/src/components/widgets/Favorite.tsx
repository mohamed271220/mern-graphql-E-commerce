import React from "react";
import { motion } from "framer-motion";
import { favArrInterface } from "../../context/isAuth";

const Favorite = ({ images, price, title, _id }: favArrInterface) => {
  return (
    <motion.div className="fav-product">
      <span>{title}</span>
    </motion.div>
  );
};

export default Favorite;
