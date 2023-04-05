import React, { useContext, useState } from "react";

import Review from "./Review";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import useCarousel from "../../custom/useCarousel";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useIndex from "../../custom/useIndex";
import { btnHover, overleyVariant, popVariant } from "../../variants/globals";
import { productContext } from "./Product";
import useMeasure from "react-use-measure";

interface Props {
  setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
}

const Reviews = ({ setShowPop }: Props) => {
  const { reviews } = useContext(productContext);

  const [reviewIndex, setRviewIndex] = useState(0);
  const handlehidePop = () => {
    setShowPop(false);
  };

  const [variant, dir] = useCarousel(reviewIndex, reviews.length);

  const [animateRef, { width }] = useMeasure();
  const [handleIndex] = useIndex();
  return (
    <motion.div
      className="overley center"
      variants={overleyVariant}
      initial="start"
      exit="exit"
      animate="end"
      onClick={handlehidePop}
      ref={animateRef}
    >
      <motion.section
        className="pop-up-reviews pop-up"
        variants={popVariant}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="heading">reviews</h2>

        <AnimatePresence custom={{ dir, width }} mode="wait">
          <motion.div
            id="reviews"
            key={reviewIndex}
            variants={variant as Variants}
            initial="start"
            exit="exit"
            animate="end"
            custom={{ dir, width }}
          >
            {reviews.map((review, i) => {
              {
                if (i === reviewIndex) {
                  return <Review key={review._id} {...review} i={i} />;
                }
              }
            })}
          </motion.div>
        </AnimatePresence>
        <div className="btn-review center">
          <motion.button
            whileHover={btnHover}
            className="center "
            style={{ background: "var(--delete)" }}
            onClick={() =>
              setRviewIndex(handleIndex(reviewIndex - 1, reviews.length))
            }
          >
            <FaLessThan />
          </motion.button>
          <motion.button
            whileHover={btnHover}
            className="center "
            style={{ background: "var(--green)" }}
            onClick={() =>
              setRviewIndex(handleIndex(reviewIndex + 1, reviews.length))
            }
          >
            <FaGreaterThan />
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Reviews;
