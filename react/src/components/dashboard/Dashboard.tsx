import React, { createContext, useState } from "react";
import Transition from "../widgets/Transition";
import DashboardAside from "./DashboardAside";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../variants/globals";
import { RxDashboard } from "react-icons/rx";
import Title from "../widgets/Title";
import Recap from "./recap/Recap";
import Charts from "./recap/Charts";

interface contextInterface {
  showAsideDash: boolean;
  setShowAsideDash: React.Dispatch<React.SetStateAction<boolean>>;
}

export const showAsideContext = createContext({} as contextInterface);

const Dashboard = () => {
  const [showAsideDash, setShowAsideDash] = useState(true);

  return (
    <showAsideContext.Provider value={{ showAsideDash, setShowAsideDash }}>
      <div className="dashboard-par ">
        <Transition />

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
