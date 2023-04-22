import React, { useContext, useRef, useEffect } from "react";
import useHide from "../../../../custom/useHide";
import { FcMinus } from "react-icons/fc";
import { BiPlus } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant, parentVariant } from "../../../../variants/globals";
import { productListContext } from "../../../../context/FilterData";
const Price = () => {
  const { setPriceFilter, priceFilter } = useContext(productListContext);

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPriceFilter(Number(e.target.value));

  const [showPrice, handleShowPrice, handleHidePrice] = useHide();
  const priceRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (priceRef?.current) {
      priceRef.current.value = String(priceFilter);
    }
  }, [priceFilter]);

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
              onChange={handlePrice}
              ref={priceRef}
              defaultValue={"0"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Price;
