import React, { useEffect, useRef, useState } from "react";
import StarIcon from "../../custom SVGs/StarIcon";

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { reviewCounter } from "../../variants/globals";

const clrsArr = [
  "var(--green)",
  "var(--delete)",
  "var(--twitter)",
  "black",
  "var(--fb)",
];

interface Props {
  _id: string;
  image: string;
  user: string;
  rate: number;
  review: string;
  i: number;
}

const Review = ({ _id, image, user, rate, review, i }: Props) => {
  const [count, setCount] = useState(0);

  const reviewRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(reviewRef);
  let interval: number | undefined;
  useEffect(() => {
    if (count <= rate && inView) {
      interval = setInterval(() => {
        setCount((cur) => cur + 1);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [count, inView]);

  return (
    <div className="review" ref={reviewRef}>
      <div className="img-review center">
        <div className="before" style={{ background: clrsArr[i] }}></div>
        <img src={image} alt={user} title={user} />
      </div>
      <p className="review-user center">{user}</p>
      <div className="review-rate center">
        <StarIcon avgRate={4} id={1} />
        <span className="center" style={{ marginBottom: -4 }}>
          <AnimatePresence mode="wait">
            <motion.span
              variants={reviewCounter}
              custom={{ count, rate }}
              key={count}
              initial="start"
              animate="end"
              exit="exit"
              className="user-rate"
            >
              {count}
            </motion.span>
          </AnimatePresence>
          <span className="five center">
            <span>/</span>5
          </span>
        </span>
      </div>

      <div className="user-review center">
        <span>
          <FaQuoteLeft className="icon" fill={clrsArr[i]} />
        </span>
        {review}
        <span>
          <FaQuoteRight className="icon" color={clrsArr[i]} />
        </span>
      </div>
    </div>
  );
};

export default Review;
