import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import UserDropDown from "./userDropDown";
import ProfileImg from "../ProfileImg";
import { isAuthContext } from "../../context/isAuth";
const NavImg = () => {
  const [showUserDrop, setShowUserDrop] = useState(false);
  const { isAuth } = useContext(isAuthContext);
  const toggleSHowUser = () => {
    if (isAuth) {
      setShowUserDrop(!showUserDrop);
    }
  };
  return (
    <>
      <motion.span
        onClick={toggleSHowUser}
        className="relative"
        style={{ display: "inline-block", height: "100%" }}
      >
        <Title title={!showUserDrop ? "go to your profile" : ""}>
          <ProfileImg dimension={30} />
        </Title>

        <UserDropDown bool={showUserDrop} />
      </motion.span>
    </>
  );
};

export default NavImg;
