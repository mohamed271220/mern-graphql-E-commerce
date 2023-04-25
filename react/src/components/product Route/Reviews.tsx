import React, { useContext, useState } from "react";

import Review from "./Review";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import useCarousel from "../../custom/useCarousel";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useIndex from "../../custom/useIndex";
import { btnHover } from "../../variants/globals";
import { productContext } from "./Product";
import useMeasure from "react-use-measure";
import Overley from "../widgets/Overley";

interface Props {
  setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
}

const Reviews = ({ setShowPop }: Props) => {
  const { addReview } = useContext(productContext);

  const [reviewIndex, setRviewIndex] = useState(0);

  const [variant, dir] = useCarousel(reviewIndex, addReview.length);

  const [animateRef, { width }] = useMeasure();
  const [handleIndex] = useIndex();
  return (
    <Overley sethide={setShowPop} cls=" pop-up-reviews pop-up">
      <h2 className="underline header" style={{ marginBottom: 20 }}>
        reviews
      </h2>
      <AnimatePresence custom={{ dir, width }} mode="wait">
        <motion.div
          id="reviews"
          ref={animateRef}
          key={reviewIndex}
          variants={variant as Variants}
          initial="start"
          exit="exit"
          animate="end"
          custom={{ dir, width }}
        >
          {addReview.map((review, i) => {
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
            setRviewIndex(handleIndex(reviewIndex - 1, addReview.length))
          }
        >
          <FaLessThan />
        </motion.button>
        <motion.button
          whileHover={btnHover}
          className="center "
          style={{ background: "var(--green)" }}
          onClick={() =>
            setRviewIndex(handleIndex(reviewIndex + 1, addReview.length))
          }
        >
          <FaGreaterThan />
        </motion.button>
      </div>
    </Overley>
  );
};

export default Reviews;