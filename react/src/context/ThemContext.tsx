import React, { createContext, useEffect, useState } from "react";
import { ChildrenInterFace } from "../interfaces/general";

interface themeContextInterface {
  theme: string;
  toggleTheme: () => void;
}
export const themeContext = createContext({} as themeContextInterface);

const ThemContext = ({ children }: ChildrenInterFace) => {
  const localstorageTheme = localStorage.getItem("zimart-theme");
  const [theme, setTheme] = useState(localstorageTheme || "light");

  useEffect(() => {
    if (theme == "light") {
      document.documentElement.style.setProperty(
        "--main",
        "rgb(247, 246, 246)"
      );
      document.documentElement.style.setProperty("--secondary", "#222222");
      localStorage.setItem("zimart-theme", "light");
    } else {
      document.documentElement.style.setProperty(
        "--secondary",
        "rgb(247, 246, 246)"
      );
      document.documentElement.style.setProperty("--main", "#222222");
      localStorage.setItem("zimart-theme", "dark");
    }
  }, [theme]);
  const toggleTheme = () =>
    setTheme((cur) => (cur === "light" ? "dark" : "light"));
  return (
    <themeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemContext;
