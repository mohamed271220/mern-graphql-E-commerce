import React, { useContext, useState } from "react";
import { isAuthContext } from "../../context/isAuth";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Title from "./Title";
import UserDropDown from "./userDropDown";
const NavImg = () => {
  const { profile } = useContext(isAuthContext);
  const [showUserDrop, setShowUserDrop] = useState(false);

  const toggleSHowUser = () => setShowUserDrop(!toggleSHowUser);
  return (
    <>
      <motion.li className="" onClick={toggleSHowUser}>
        <NavLink to={"/user"}>
          <Title title={"go to your profile"}>
            <img src={profile} alt="" className="img-nav" />
          </Title>
        </NavLink>
      </motion.li>
      <UserDropDown bool={showUserDrop} />
    </>
  );
};

export default NavImg;
