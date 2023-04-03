import React, { useState } from "react";
import { useAnimate } from "framer-motion";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleCount = (num: number) => {
    if (num < 0) {
      return 0;
    } else if (num >= 20) {
      return 20;
    } else {
      return num;
    }
  };

  const handleIncrease = () => setCount((cur): number => handleCount(cur + 1));
  const handleDecrease = () => setCount((cur): number => handleCount(cur - 1));

  const [countRef, animateCount] = useAnimate();

  return (
    <div className="counter center" ref={countRef}>
      <button
        style={{ color: "var(--delete)" }}
        onClick={() => {
          handleDecrease();
          if (count != 0) {
            animateCount("small", { y: [40, -5, 0] }, { duration: 0.4 });
          }
        }}
        className="center btn counter-span"
      >
        -
      </button>
      <span className="count">
        <small>{count}</small>
      </span>
      <button
        style={{ color: "var(--green)" }}
        onClick={() => {
          handleIncrease();
          if (count != 20) {
            animateCount("small", { y: [-40, 5, 0] }, { duration: 0.4 });
          }
        }}
        className="center btn counter-span"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
