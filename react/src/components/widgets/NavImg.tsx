import React, { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import UserDropDown from "./userDropDown";
import ProfileImg from "./ProfileImg";
import { isAuthContext } from "../../context/isAuth";

const NavImg = () => {
  const [showUserDrop, setShowUserDrop] = useState(false);
  const { isAuth } = useContext(isAuthContext);
  const handleSHowUser = () => {
    if (isAuth) {
      setShowUserDrop(true);
    }
  };

  return (
    <>
      <motion.span
        onClick={handleSHowUser}
        className="relative"
        style={{ display: "inline-block", height: "100%" }}
      >
        <Title title={!showUserDrop ? "go to your profile" : ""}>
          <ProfileImg dimension={30} />
        </Title>

        <UserDropDown bool={showUserDrop} setter={setShowUserDrop} />
      </motion.span>
    </>
  );
};

export default NavImg;
