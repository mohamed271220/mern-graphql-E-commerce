import React from "react";
import Star from "./Star";
import Checkbox from "../../../custom/checkbox";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant, parentVariant } from "../../../variants/globals";
import useHide from "../../../custom/useHide";

import { FcMinus } from "react-icons/fc";
import { BiPlus } from "react-icons/bi";

const Rating = () => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const group: React.ReactNode[] = [];

    for (let g = 5; g >= 1; g--) {
      group.push(
        <Star
          key={`${Date.now()}-${Math.random().toString(16)}`}
          bool={g >= i ? true : false}
        />
      );
    }

    stars.push(
      <motion.div
        variants={opacityVariant}
        className="center category"
        style={{ width: "100%" }}
        key={`group-${i}`}
      >
        <Checkbox />
        <span>{group}</span>
      </motion.div>
    );
  }

  const [showRating, handleShowRating, handleHideRating] = useHide();
  return (
    <div>
      <div className="filter-head center between">
        <h4>Rating </h4>

        <AnimatePresence mode="wait">
          {showRating ? (
            <motion.span
              variants={opacityVariant}
              initial="start"
              animate="end"
              exit="exit"
              key={"plus"}
              transition={{ duration: 0.4 }}
            >
              <FcMinus onClick={handleHideRating} />
            </motion.span>
          ) : (
            <motion.span
              variants={opacityVariant}
              initial="start"
              animate="end"
              exit={"exit"}
              key={"minus"}
              transition={{ duration: 0.4 }}
            >
              <BiPlus onClick={handleShowRating} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {showRating && (
          <motion.div
            variants={parentVariant}
            key={"rating-parent"}
            initial="start"
            animate="end"
            exit={"exit"}
          >
            {stars}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hr"></div>
    </div>
  );
};

export default Rating;
