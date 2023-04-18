import React, { useContext } from "react";
import { BsListTask } from "react-icons/bs";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";
import { viewFilterContext } from "./Products";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../../variants/globals";
import SelectFilter from "./SelectFilter";

const Sort = () => {
  const { setShowFilter, showFilter, setGridView, gridView } =
    useContext(viewFilterContext);

  const toggleShowFilter = () => setShowFilter(!showFilter);

  return (
    <div className="sort-par  center between">
      <h2>Our Products</h2>

      <div className="center view-opt">
        <div className="hide-filter-par">
          <button className="center">
            <AnimatePresence mode="wait">
              {showFilter ? (
                <motion.span
                  onClick={toggleShowFilter}
                  variants={opacityVariant}
                  initial="start"
                  exit="exit"
                  animate="end"
                  transition={{ duration: 0.4 }}
                  key={"show-filter"}
                >
                  hide filters
                </motion.span>
              ) : (
                <motion.span
                  key={"hide-filter"}
                  onClick={toggleShowFilter}
                  className="center"
                  variants={opacityVariant}
                  initial="start"
                  exit="exit"
                  animate="end"
                  transition={{ duration: 0.4 }}
                >
                  show filters
                </motion.span>
              )}
            </AnimatePresence>
            <IoFilter />
          </button>
        </div>

        <div className="view-par center ">
          <span className="display">display</span>
          <BsListTask
            onClick={() => setGridView(false)}
            style={{ color: gridView ? "black" : "var(--green)" }}
            className={`view-icon  ${!gridView ? "shadow" : ""} `}
          />
          <HiOutlineViewGrid
            onClick={() => setGridView(true)}
            style={{ color: gridView ? "var(--green)" : "black" }}
            className={`view-icon  ${gridView ? "shadow" : ""} `}
          />
        </div>
        <SelectFilter />
      </div>
      <div className="hr sort-hr"></div>
    </div>
  );
};

export default Sort;
