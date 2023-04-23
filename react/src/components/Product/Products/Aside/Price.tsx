import React, { useContext, useRef, useEffect } from "react";
import useHide from "../../../../custom/useHide";
import { FcMinus } from "react-icons/fc";
import { BiPlus } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant, parentVariant } from "../../../../variants/globals";
import { productListContext } from "../../../../context/FilterData";
import useShowTitle from "../../../../custom/useShowTitle";
import Title from "../../../widgets/Title";
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
  const [bool, show, hide] = useShowTitle();

  return (
    <div className="center category-par">
      <h4 className="filter-head  header underline">
        Price
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
      </h4>
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
            <motion.span
              onHoverStart={show}
              onHoverEnd={hide}
              className="title-par relative"
            >
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
              <Title bool={bool} title="select max price" />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Price;
