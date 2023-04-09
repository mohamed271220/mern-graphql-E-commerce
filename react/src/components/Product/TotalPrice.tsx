import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Price from "./Price";
const TotalPrice = ({ subTotal }: { subTotal: number }) => {
  const [total, setTotal] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);
  const [discount, setDiscount] = useState(false);

  //     { detail: "subtotal", value: subTotal, condition: "" },
  //     { detail: "Shipping", value: "$ 10", condition: freeShipping },
  //     { detail: "discount", value: "0" },
  //   ];
  useEffect(() => {
    if (subTotal >= 800) {
      setFreeShipping(true);
    } else {
      setFreeShipping(false);
    }
    if (subTotal >= 1000) {
      setDiscount(true);
    } else {
      setDiscount(false);
    }
  }, [subTotal]);

  useEffect(() => {
    if (freeShipping && discount) {
      setTotal(subTotal - subTotal * 0.05);
    } else if (freeShipping) {
      setTotal(subTotal);
    } else {
      setTotal(subTotal + 10);
    }
  }, [subTotal, freeShipping, discount]);

  const priceVariant = {
    start: {},
    end: (bool: boolean) => ({
      opacity: bool ? 0.4 : 1,
      transition: { delay: bool ? 0 : 0.8 },
    }),
  };

  const freeVariant = {
    start: { opacity: 0 },
    end: { opacity: 1, transition: { delay: 1, duration: 0.2 } },
    exit: { opacity: 0, transition: { delay: 0, duration: 0.2 } },
  };

  const lineVariant = {
    start: { width: 0 },
    end: {
      width: "100%",
      transition: { delay: 0.4, duration: 0.4 },
    },
    exit: { width: 0, transition: { delay: 0.5, duration: 0.2 } },
  };

  //   console.log({ totalPriceState });
  //   const totalPriceVariant = {
  //     start: (str: string) => ({
  //       opacity: 0,
  //       y: str === "increase" ? -100 : 100,
  //     }),
  //     end: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  //     exit: (str: string) => ({
  //       y: str === "increase" ? 10 : -100,
  //       transition: { duration: 0.3 },
  //     }),
  //   };

  return (
    <div
      className="totel-price center
  "
    >
      <h3 className="heading" style={{ width: "fit-content" }}>
        order summary
      </h3>

      <h3>
        <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
          total:
        </span>
        <span>
          <span>$</span>
          <AnimatePresence mode="wait">
            <Price num={total} key={"total-$"} />
          </AnimatePresence>
        </span>
      </h3>
      <div className="order-details  w-100">
        <div className="center between w-100">
          <span className="detail">subtotal</span>

          <span>
            {" "}
            $
            <AnimatePresence mode="wait">
              <Price num={subTotal} key={"subtotal"} />
            </AnimatePresence>
          </span>
        </div>

        <div className="center between w-100">
          <span className="detail">shipping</span>
          <span
            className="free-par"
            // variants={parVariant}
            // initial="start"
            // animate={freeShipping ? "end" : ""}
            // exit={!freeShipping ? "exit" : ""}
            // custom={freeShipping}
          >
            <motion.span
              variants={priceVariant}
              custom={freeShipping}
              initial="start"
              animate="end"
              exit="exit"
              key={"price"}
            >
              $10
            </motion.span>
            <AnimatePresence>
              {freeShipping && (
                <>
                  <motion.span
                    key={"line"}
                    variants={lineVariant}
                    custom={freeShipping}
                    className="free-line"
                    initial="start"
                    animate="end"
                    exit="exit"
                  ></motion.span>
                  <motion.span
                    key={"free"}
                    variants={freeVariant}
                    initial="start"
                    animate="end"
                    exit="exit"
                    className="free"
                  >
                    {" "}
                    free
                  </motion.span>{" "}
                </>
              )}
            </AnimatePresence>
          </span>
        </div>

        <div className="center between w-100">
          <span className="detail">discount</span>
          <span>
            $
            <AnimatePresence>
              <Price key={"discounted"} num={discount ? 0.05 * subTotal : 0} />
            </AnimatePresence>
          </span>
        </div>
      </div>
      {/* </AnimatePresence> */}
    </div>
  );
};

export default TotalPrice;
