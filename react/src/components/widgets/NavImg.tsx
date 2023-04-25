import React, { useState } from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import UserDropDown from "./userDropDown";
import ProfileImg from "../ProfileImg";
const NavImg = () => {
  const [showUserDrop, setShowUserDrop] = useState(false);

  const toggleSHowUser = () => setShowUserDrop(!showUserDrop);
  return (
    <>
      <motion.li onClick={toggleSHowUser}>
        <Title title={"go to your profile"}>
          <ProfileImg dimension={30} />
          {/* <img src={profile} alt="" className="img-nav " /> */}
        </Title>
        <UserDropDown bool={showUserDrop} />
      </motion.li>
    </>
  );
};

export default NavImg;
