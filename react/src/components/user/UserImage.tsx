import React from "react";
import { motion } from "framer-motion";
import { btnHover, btnTap } from "../../variants/globals";
const UserImage = () => {
  return (
    <div className="user-image ">
      <div className="user-img-par ">
        <img src="" alt="" />
      </div>
      <motion.button
        whileTap={btnTap}
        whileHover={btnHover}
        className="user-img-btn btn"
      >
        update your avatar
      </motion.button>
    </div>
  );
};

export default UserImage;
