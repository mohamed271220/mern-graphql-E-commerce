import React, { useState } from "react";
import { useAnimate } from "framer-motion";
import { useAppDispatch } from "../../../custom/reduxTypes";
import { changeCartCountRedux } from "../../../redux/CartSlice";
import { useMutation } from "@apollo/client";
import { Change_Cart_Count } from "../../../graphql/mutations/user";
import Cookies from "js-cookie";

const Counter = ({
  count: defaultCount,
  productId,
}: {
  productId: string;
  count: number;
}) => {
  const userId = Cookies.get("user-id");
  const [count, setCount] = useState(defaultCount);
  const handleCount = (num: number) => {
    if (num < 1) {
      return 1;
    } else if (num >= 20) {
      return 20;
    } else {
      return num;
    }
  };
  const dispatch = useAppDispatch();
  const [changeCartCuntDB] = useMutation(Change_Cart_Count);
  const handleIncrease = () => setCount((cur): number => handleCount(cur + 1));
  const handleDecrease = () => setCount((cur): number => handleCount(cur - 1));

  const [countRef, animateCount] = useAnimate();

  return (
    <div className="counter center" ref={countRef}>
      <button
        style={{ color: "var(--delete)", fontSize: "1.2rem" }}
        onClick={() => {
          handleDecrease();
          if (count != 1) {
            dispatch(changeCartCountRedux({ count: count - 1, productId }));

            animateCount("small", { y: [40, -5, 0] }, { duration: 0.4 });

            changeCartCuntDB({
              variables: {
                userId,
                productId,
                count: count - 1,
              },
            });
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
        style={{ color: "var(--green)", fontSize: "1.2rem" }}
        onClick={() => {
          handleIncrease();

          if (count != 20) {
            dispatch(changeCartCountRedux({ count: count + 1, productId }));
            animateCount("small", { y: [-40, 5, 0] }, { duration: 0.4 });
            changeCartCuntDB({
              variables: {
                userId,
                productId,
                count: count + 1,
              },
            });
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
