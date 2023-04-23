import React, { useContext } from "react";
import Checkbox from "../../../../custom SVGs/checkbox";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant, parentVariant } from "../../../../variants/globals";
import useHide from "../../../../custom/useHide";

import { FcMinus } from "react-icons/fc";
import { BiPlus } from "react-icons/bi";
import Star from "./Star";
import { productListContext } from "../../../../context/FilterData";
import FIlter from "./FIlter";

const Rating = () => {
  const { RateChecked, setRateChecked } = useContext(productListContext);

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
        className="center rate-filter-par"
        style={{ width: "fit-content" }}
        key={`group-${i}`}
        onClick={() => setRateChecked(6 - i === RateChecked ? "" : 6 - i)}
      >
        <Checkbox
          isChecked={RateChecked}
          setIsChecked={setRateChecked}
          filter={6 - i}
        />
        <span className="rate-filter">{group}</span>
      </motion.div>
    );
  }

  return (
    <FIlter head="rating">
      <motion.div
        variants={parentVariant}
        key={"rating-parent"}
        initial="start"
        animate="end"
        exit={"exit"}
      >
        {stars}
      </motion.div>
    </FIlter>
  );
};

export default Rating;
