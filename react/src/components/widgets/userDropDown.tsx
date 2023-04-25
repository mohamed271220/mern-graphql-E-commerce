import React, { useContext } from "react";
import DropDown from "./DropDown";
import ProfileImg from "../ProfileImg";
import { isAuthContext } from "../../context/isAuth";
import { NavLink } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { RiLogoutBoxRFill, RiLogoutCircleRFill } from "react-icons/ri";
import { FcSettings } from "react-icons/fc";

interface Props {
  bool: boolean;
}
const UserDropDown = ({ bool }: Props) => {
  const { name } = useContext(isAuthContext);
  const dropArr = [
    { link: "update your data", icon: FiEdit, to: "/user" },
    { link: "settings", icon: FcSettings, to: "/setting" },

    { link: "logout", icon: RiLogoutCircleRFill, to: "/login" },
  ];

  return (
    <DropDown cls="user-drop center col" bool={bool}>
      <div className="w-100">
        <div className="user-drop-img center gap">
          <ProfileImg dimension={30} />
          <span> {name}</span>
        </div>
        <div className="hr"></div>
      </div>

      {dropArr.map(({ icon: Icon, link, to }, i) => {
        return (
          <div key={i} className="w-100 ">
            <div className="center gap user-drop-link">
              <Icon fontSize={15} className="shadow user-icon" />
              <NavLink to={`${to}`}> {link}</NavLink>
            </div>
            {link !== "logout" && <div key={link} className="hr"></div>}
          </div>
        );
      })}
    </DropDown>
  );
};

export default UserDropDown;
