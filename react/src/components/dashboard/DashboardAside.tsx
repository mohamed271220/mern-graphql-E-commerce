import React, { useContext, useEffect } from "react";
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
import useIsMobile from "../../custom/useIsMobile";

interface Props {
  setShowAsideDash: React.Dispatch<React.SetStateAction<boolean>>;
}
const DashboardAside = ({ setShowAsideDash }: Props) => {
  const { showAsideDash } = useContext(showAsideContext);
  const { handleLogOut } = useLogOut();

  useEffect(() => {
    sessionStorage.setItem("show-aside", String(showAsideDash));
  }, [showAsideDash]);
  const { isMobile } = useIsMobile();

  const dashAsideLinks = [
    {
      head: "Main",
      links: [
        {
          link: "dashboard",
          to: "/dashboard",
          Icon: AiFillDashboard,
          active: "dashboard",
        },
      ],
    },
    {
      head: "products",
      links: [
        {
          link: "all products",
          to: "/dashboard/products",
          Icon: GrProductHunt,
          active: "products",
        },
        {
          link: "add product",
          to: "/dashboard/products/add",
          Icon: TbSquareRoundedPlusFilled,
          active: "add",
        },
      ],
    },

    {
      head: "orders",
      links: [
        {
          link: "orders",
          to: "/dashboard/orders",
          Icon: FaClipboardList,
          active: "orders",
        },
      ],
    },

    {
      head: "users",
      links: [
        {
          link: "users",
          to: "/dashboard/users",
          Icon: FaUserAlt,
          active: "users",
        },
        {
          link: "logout",
          to: "/login",
          Icon: AiFillCloseCircle,
          active: "login",
        },
      ],
    },
  ];
  return (
    <AnimatePresence mode="wait">
      {showAsideDash && (
        <motion.aside
          id="dash-aside"
          variants={asideVariant}
          custom={isMobile}
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

          {dashAsideLinks.map(({ head, links }, i) => {
            return (
              <span key={`dash-link ${head}`}>
                <h4 className="aside-dash-label">{head}</h4>
                <>
                  {links.map(({ link, to, Icon, active }, i) => {
                    return (
                      <Link
                        key={link}
                        className={
                          location.pathname.split("/").slice(-1)[0] === active
                            ? "active"
                            : ""
                        }
                        to={to}
                        onClick={() => {
                          if (isMobile) {
                            setShowAsideDash(false);
                          }
                          if (link === "logout") {
                            handleLogOut();
                          }
                        }}
                      >
                        <Icon className="icon" color="var(--twitter)" />
                        <span>{link}</span>
                      </Link>
                    );
                  })}
                </>
              </span>
            );
          })}

          <AnimatePresence>
            {isMobile && (
              <motion.span
                key={"hide-dash"}
                variants={opacityVariant}
                transition={{ duration: 0.4 }}
                className="dash-aside-close"
                onClick={() => setShowAsideDash(false)}
              >
                <Title title="hide dashboard aside nav">
                  <AiFillCloseCircle className="icon red" />
                </Title>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default DashboardAside;
