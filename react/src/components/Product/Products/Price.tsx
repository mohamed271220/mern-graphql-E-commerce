import React, { useContext } from "react";
import useHide from "../../../custom/useHide";
import { FcMinus } from "react-icons/fc";
import { BiPlus } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant, parentVariant } from "../../../variants/globals";
import { viewFilterContext } from "./Products";
const Price = () => {
  const { setPriceFilter, priceFilter } = useContext(viewFilterContext);

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPriceFilter(Number(e.target.value));

  const [showPrice, handleShowPrice, handleHidePrice] = useHide();

  return (
    <div>
      <div className="filter-head center between">
        <h4>Price </h4>

        <AnimatePresence mode="wait">
          {showPrice ? (
            <motion.span
              variants={opacityVariant}
              initial="start"
              animate="end"
              exit="exit"
              key={"plus"}
              transition={{ duration: 0.4 }}
            >
              <FcMinus onClick={handleHidePrice} />
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
              <BiPlus onClick={handleShowPrice} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        {showPrice && (
          <motion.div
            variants={parentVariant}
            key={"parent"}
            initial="start"
            animate="end"
            exit={"exit"}
            className="price-filter"
          >
            <motion.p variants={opacityVariant}>{priceFilter} $</motion.p>
            <motion.input
              variants={opacityVariant}
              type="range"
              step="20"
              min={0}
              max={2000}
              defaultValue={priceFilter}
              onChange={handlePrice}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Price;
