import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import DashboardAside from "./DashboardAside";
import { Outlet } from "react-router-dom";
import { useScroll, useTransform } from "framer-motion";
import ThemeToggle from "../widgets/ThemeToggle";
import { themeContext } from "../../context/ThemContext";
import NotificationDropDown from "./NotificationDropDown";
import MenuTogglar from "../widgets/MenuTogglar";
interface contextInterface {
  showAsideDash: boolean;
  setShowAsideDash: React.Dispatch<React.SetStateAction<boolean>>;
}

export const showAsideContext = createContext({} as contextInterface);

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboaed";
  }, []);
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
        <div className="dash-nav center">
          <MenuTogglar
            bool={showAsideDash}
            setter={setShowAsideDash}
            hideMsg="hide dashboard"
            showMsg="show dashboard"
          />
          <NotificationDropDown />
          <ThemeToggle navClr={navClr} linkClr={LinkClr} />
        </div>

        <DashboardAside setShowAsideDash={setShowAsideDash} />
        <Outlet />
      </div>
    </showAsideContext.Provider>
  );
};

export default Dashboard;
