import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { asideVariant, opacityVariant } from "../../variants/globals";
import { NavLink, Link } from "react-router-dom";
import { GrProductHunt } from "react-icons/gr";
import { AiFillCloseCircle, AiFillDashboard } from "react-icons/ai";
import Title from "../widgets/Title";
import { showAsideContext } from "./Dashboard";
import { FaClipboardList, FaUserAlt } from "react-icons/fa";
import LogoSvg from "../widgets/LogoSvg";
import { RiLogoutCircleRFill } from "react-icons/ri";
import useLogOut from "../../custom/useLogOut";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

const DashboardAside = () => {
  const { showAsideDash } = useContext(showAsideContext);
  const { handleLogOut } = useLogOut();

  return (
    <AnimatePresence mode="wait">
      {showAsideDash && (
        <motion.aside
          id="dash-aside"
          variants={asideVariant}
          initial="start"
          exit="exit"
          animate="end"
          key={"dash-aside"}
        >
          <div
            style={{
              width: "100%",
              height: 60,
            }}
            className="center dash-aside-head"
          >
            <Link to={"/"}>
              <LogoSvg />
            </Link>
          </div>

          <h4 className="aside-dash-label">main</h4>

          <Link
            className={
              location.pathname.split("/").slice(-1)[0] === "dashboard"
                ? "active"
                : ""
            }
            to={"/dashboard"}
          >
            <AiFillDashboard className="icon" color="var(--twitter)" />
            <span>dashboard</span>
          </Link>
          <h4 className="aside-dash-label">products</h4>

          <Link
            to={"/dashboard/products"}
            className={
              location.pathname.split("/").slice(-1)[0] === "products"
                ? "active"
                : ""
            }
          >
            <GrProductHunt className="icon" color="var(--twitter)" />
            <span>all products</span>
          </Link>
          <Link
            className={
              location.pathname.split("/").slice(-1)[0] === "add"
                ? "active"
                : ""
            }
            to={"/dashboard/products/add"}
          >
            <TbSquareRoundedPlusFilled
              className="icon"
              color="var(--twitter)"
            />
            <span>add product</span>
          </Link>

          <h4 className="aside-dash-label">orders</h4>

          <NavLink to={"/dashboard/orders"}>
            <FaClipboardList className="icon" color="var(--twitter)" />
            <span>orders</span>
          </NavLink>

          <h4 className="aside-dash-label">users</h4>
          <Link
            className={
              location.pathname.split("/").slice(-1)[0] === "users"
                ? "active"
                : ""
            }
            to={"/dashboard/users"}
          >
            <FaUserAlt className="icon" color="var(--twitter)" />
            <span>users</span>
          </Link>

          <Link to={"/login"} onClick={handleLogOut}>
            <RiLogoutCircleRFill className="icon" color="var(--twitter)" />
            <span>logout</span>
          </Link>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default DashboardAside;
