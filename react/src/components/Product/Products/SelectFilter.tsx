import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { viewFilterContext } from "./Products";
import {
  FILTER_BY_PRICE,
  FILTER_BY_Rate,
  FILTER_BY_STATE,
} from "../../../graphql/mutations/product";
import { Get_All_Products } from "../../../graphql/general";
import { MdOutlineSort } from "react-icons/md";
import { BiDownArrow } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../../variants/globals";
const optionsArr = [
  "relevance",
  "highest price",
  "lowest price",
  "highest rate",
  "lowest rate",
];

const SelectFilter = () => {
  const { setProducts } = useContext(viewFilterContext);
  const [selectValue, setSelectValue] = useState("relevance");
  const [fnRevlence] = useLazyQuery(Get_All_Products);
  const [fnTrendy] = useMutation(FILTER_BY_STATE);
  const [fnPrice] = useMutation(FILTER_BY_PRICE);
  const [fnRate] = useMutation(FILTER_BY_Rate);

  useEffect(() => {
    if (selectValue === "relevance") {
      fnRevlence().then(({ data }) => setProducts(data.products));
    } else if (selectValue === "lowest price") {
      fnPrice({
        variables: {
          price: 1,
        },
      }).then(({ data }) => setProducts(data.filterByPrice));
    } else if (selectValue === "highest price") {
      fnPrice({
        variables: {
          price: -1,
        },
      }).then(({ data }) => setProducts(data.filterByPrice));
    } else if (selectValue === "lowest rate") {
      fnRate({
        variables: {
          rate: 1,
        },
      }).then(({ data }) => setProducts(data.filterByRate));
    } else if (selectValue === "highest rate") {
      fnRate({
        variables: {
          rate: -1,
        },
      }).then(({ data }) => setProducts(data.filterByRate));
    }
  }, [selectValue]);

  const [isSelectFocus, setIsSelectFocus] = useState(false);

  const selectDropDownVariants = {
    start: { opacity: 0 },
    end: {
      opacity: 1,
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.1,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
        duration: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  return (
    <div
      className="custom-select"
      onClick={() => setIsSelectFocus(!isSelectFocus)}
    >
      <BiDownArrow className="icon select-icon arrow" />
      <span className="icon select-icon sort center">
        <MdOutlineSort /> sort: <span className="value"> {selectValue}</span>
      </span>
      <AnimatePresence>
        {isSelectFocus && (
          <motion.ul
            className="select-dropdown center col"
            variants={selectDropDownVariants}
            initial="start"
            animate="end"
            exit="exit"
          >
            {optionsArr.map((opt, i) => {
              return (
                <motion.li
                  style={{
                    color:
                      opt === selectValue ? "var(--wheat)" : "var(--white)",
                  }}
                  variants={opacityVariant}
                  onClick={() => setIsSelectFocus(false)}
                  key={i}
                  whileHover={{ x: 10 }}
                  onTapStart={() => setSelectValue(opt)}
                >
                  {opt}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectFilter;
