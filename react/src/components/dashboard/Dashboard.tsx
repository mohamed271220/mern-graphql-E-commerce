import React, { createContext, useContext, useRef, useState } from "react";
import Transition from "../widgets/Transition";
import DashboardAside from "./DashboardAside";
import { Outlet } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { opacityVariant } from "../../variants/globals";
import { RxDashboard } from "react-icons/rx";
import Title from "../widgets/Title";
import Recap from "./recap/Recap";
import Charts from "./recap/Charts";
import ThemeToggle from "../ThemeToggle";
import { themeContext } from "../../context/ThemContext";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql/mutations/user";
import NavImg from "../widgets/NavImg";

interface contextInterface {
  showAsideDash: boolean;
  setShowAsideDash: React.Dispatch<React.SetStateAction<boolean>>;
}

export const showAsideContext = createContext({} as contextInterface);

const Dashboard = () => {
  const [showAsideDash, setShowAsideDash] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({
    target: ref,
  });

  const { theme } = useContext(themeContext);
  const navClr = useTransform(
    scrollY,
    [0],
    [theme === "dark" ? "#000" : "#fff"]
  );

  const LinkClr = useTransform(
    scrollY,
    [0],
    [theme !== "light" ? "#fff" : "#000"]
  );

  return (
    <showAsideContext.Provider value={{ showAsideDash, setShowAsideDash }}>
      <div className="dashboard-par " ref={ref}>
        <Transition />
        <div style={{ marginRight: 10 }} className="dash-nav center gap">
          <NavImg />

          <ThemeToggle navClr={navClr} linkClr={LinkClr} />
        </div>

        <AnimatePresence mode="wait">
          {!showAsideDash && (
            <motion.span
              key={"show-dash"}
              variants={opacityVariant}
              initial="start"
              exit="exit"
              animate="end"
              className="dash-show"
              transition={{ duration: 0.4, delay: showAsideDash ? 0 : 0.4 }}
              onClick={() => setShowAsideDash(true)}
            >
              <Title title="show dashboard aside nav">
                <RxDashboard className="icon" />
              </Title>
            </motion.span>
          )}
        </AnimatePresence>
        <DashboardAside />
        <Outlet />
      </div>
    </showAsideContext.Provider>
  );
};

export default Dashboard;
