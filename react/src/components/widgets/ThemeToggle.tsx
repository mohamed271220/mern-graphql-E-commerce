import React, { useContext } from "react";
import { TbMoonFilled } from "react-icons/tb";
import { CiSun } from "react-icons/ci";
import { themeContext } from "../../context/ThemContext";
import Title from "./Title";
import { AnimatePresence, MotionValue, motion } from "framer-motion";
import { FaSun } from "react-icons/fa";

interface Props {
  linkClr: MotionValue<string>;
  navClr: MotionValue<string>;
}
const ThemeToggle = ({ linkClr, navClr }: Props) => {
  const { toggleTheme, theme } = useContext(themeContext);
  const variant = {
    start: { x: theme === "light" ? 0 : 10 },
    end: {
      x: theme === "dark" ? 0 : 10,
      rotate: theme === "light" ? 360 : -360,
    },
  };
  return (
    <motion.div
      // style={{ background: linkClr }}
      onClick={toggleTheme}
      className="theme"
    >
      <Title title={theme === "light" ? "apply dark mode" : "apply light mode"}>
        <AnimatePresence initial={false}>
          <motion.div
            className="toggle-icon center"
            variants={variant}
            animate="end"
            style={{ background: navClr, color: linkClr }}
            initial="start"
          >
            {theme === "dark" ? (
              <TbMoonFilled className="moon" />
            ) : (
              <FaSun className="sun" />
            )}
          </motion.div>
        </AnimatePresence>
      </Title>
    </motion.div>
  );
};

export default ThemeToggle;
