import React, { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { asideVariant, opacityVariant } from "../../variants/globals";
import { Link } from "react-router-dom";
import Title from "../widgets/Title";
import { showAsideContext } from "./Dashboard";
import LogoSvg from "../widgets/LogoSvg";
import useLogOut from "../../custom/useLogOut";
import { AiFillCloseCircle } from "react-icons/ai";
import useIsMobile from "../../custom/useIsMobile";
import { dashAsideLinks } from "../../assets/arries/LinksArr.js";

interface Props {
  setShowAsideDash: React.Dispatch<React.SetStateAction<boolean>>;
}
const DashboardAside = ({ setShowAsideDash }: Props) => {
  const { showAsideDash } = useContext(showAsideContext);
  const { handleLogOut } = useLogOut();

  const { isMobile } = useIsMobile();

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
