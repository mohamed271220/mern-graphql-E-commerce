import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Overley from "./widgets/Overley";
import CircleCheckSvg from "../custom SVGs/CircleCheckSvg";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { textVariant } from "../variants/globals";
const StripeSuccess = () => {
  const location = useLocation();
  const isSuccess = location.search.includes("?success=true");

  const [show, setShow] = useState(false);
  console.log({ isSuccess });
  useEffect(() => {
    if (isSuccess) {
      setShow(true);
    }
  }, [isSuccess]);

  const parVar = {
    start: {},
    end: { transition: { staggerChildren: 0.4 } },
  };
  return (
    <AnimatePresence>
      {show && (
        <Overley
          dir="bottom"
          height={200}
          sethide={setShow}
          cls="order-success gap center col "
        >
          <motion.div className={` confirmed center col gap`} variants={parVar}>
            <div className="scale">
              <CircleCheckSvg check={true} />
            </div>
            <motion.span
              variants={textVariant}
              //   initial="start"
              //   exit="exit"
              //   animate="end"
              onAnimationComplete={() =>
                setTimeout(() => {
                  setShow(false);
                }, 2000)
              }
            >
              your order is submitted
            </motion.span>
          </motion.div>
        </Overley>
      )}
    </AnimatePresence>
  );
};

export default StripeSuccess;
