import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { asideVariant, opacityVariant } from "../../variants/globals";
import { NavLink } from "react-router-dom";
import { GrProductHunt } from "react-icons/gr";
import { AiFillCloseCircle } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import Title from "../widgets/Title";
import { showAsideContext } from "./Dashboard";
import { FaClipboardList } from "react-icons/fa";

const DashboardAside = () => {
  const { showAsideDash, setShowAsideDash } = useContext(showAsideContext);
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
              background: "var(--sale)",
            }}
          >
            <h2
              className="underline header"
              style={{
                // width: "fit-content",
                color: "white",
                margin: "15px auto",
              }}
            >
              dashboard
            </h2>
          </div>
          <AnimatePresence mode="wait">
            {showAsideDash && (
              <motion.span
                key={"hide-dash"}
                variants={opacityVariant}
                transition={{ duration: 0.4 }}
                onClick={() => setShowAsideDash(false)}
                className="dash-close"
              >
                <Title title="hide dashboard nav">
                  <AiFillCloseCircle className="icon" />
                </Title>
              </motion.span>
            )}
          </AnimatePresence>

          <NavLink to={"/dashboard/products"}>
            <GrProductHunt />
            <span>products</span>
          </NavLink>
          <NavLink to={"/dashboard/products/add"}>
            <GrProductHunt />
            <span>add</span>
          </NavLink>
          <NavLink to={"/dashboard/orders"}>
            <FaClipboardList />
            <span>orders</span>
          </NavLink>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default DashboardAside;
