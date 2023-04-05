import React, { useState } from "react";
import useHide from "../../../custom/useHide";
import { FcMinus } from "react-icons/fc";
import { BiPlus } from "react-icons/bi";
import { AnimatePresence, motion, stagger } from "framer-motion";
import { opacityVariant, parentVariant } from "../../../variants/globals";
const Price = () => {
  const [price, setPrice] = useState(0);

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPrice(Number(e.target.value));

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
            id="filter"
          >
            <motion.p variants={opacityVariant}>{price} $</motion.p>
            <motion.input
              variants={opacityVariant}
              type="range"
              step="4"
              min={0}
              max={400}
              defaultValue={0}
              onChange={handlePrice}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Price;
