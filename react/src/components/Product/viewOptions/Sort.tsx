import React, { useContext } from "react";
import { BsListTask } from "react-icons/bs";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../../variants/globals";
import SelectFilter from "./SelectFilter";
import Search from "./Search";
import { viewContext } from "../../../context/gridView";
import { productListContext } from "../../../context/FilterData";
import Title from "../../widgets/Title";

const Sort = () => {
  const { setShowFilter, showFilter } = useContext(productListContext);

  const { setGridView, gridView } = useContext(viewContext);
  const toggleShowFilter = () => setShowFilter(!showFilter);

  return (
    <div className="sort-par  center between">
      <Search />
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
                  style={{ color: "var(--third)" }}
                >
                  Hide Filters
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
                  style={{ color: "var(--secondary)" }}
                >
                  Show Filters
                </motion.span>
              )}
            </AnimatePresence>
            <IoFilter color="var(--secondary)" />
          </button>
        </div>
        <div className="view-par center ">
          <span className="display" style={{ color: "var(--third)" }}>
            Display
          </span>

          <Title title="list view">
            <BsListTask
              onClick={() => setGridView(false)}
              style={{ color: gridView ? "var(--third)" : "var(--green)" }}
              className={`view-icon  ${!gridView ? "shadow" : ""} `}
            />
          </Title>

          <Title title="grid view">
            <HiOutlineViewGrid
              onClick={() => setGridView(true)}
              style={{ color: gridView ? "var(--green)" : "var(--third)" }}
              className={`view-icon  ${gridView ? "shadow" : ""} `}
            />
          </Title>
        </div>
        <SelectFilter />
      </div>
      <div className="hr sort-hr"></div>
    </div>
  );
};

export default Sort;
