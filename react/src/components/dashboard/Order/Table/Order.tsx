import React, { useEffect, useState } from "react";
import Checkbox from "../../../../custom SVGs/checkbox";
import Title from "../../../widgets/Title";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../../../variants/globals";
import FadeElement from "../../../widgets/FadeElement";
import OrderDropDown from "../OrderDropDown";
import useUpdateOrder from "../../../../custom/useUpdateOrder";

interface Props {
  state: string;
  _id: string;
  cost: number;
  count: number;
  index: number;
  createdAt: string;
  deliveredAt: string;
}
const Order = ({
  deliveredAt,
  state,
  _id,
  cost,
  count,
  index,
  createdAt,
}: Props) => {
  const [isSelected, setIsSeleted] = useState<number | string>("");
  const [orderState, setOrderState] = useState(state);

  return (
    <>
      <td className="center" style={{ height: 20 }}>
        <Checkbox
          filter={_id}
          isChecked={isSelected}
          setIsChecked={setIsSeleted}
          index={index}
        />{" "}
      </td>

      <td>{_id}</td>
      <td>
        {new Date(createdAt).toLocaleDateString()} -{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </td>
      <td>
        <AnimatePresence mode="wait">
          {deliveredAt ? (
            <FadeElement cls="">
              {new Date(deliveredAt).toLocaleDateString()} -
              {new Date(deliveredAt).toLocaleTimeString()}
            </FadeElement>
          ) : (
            <FadeElement cls="">&#95;</FadeElement>
          )}
        </AnimatePresence>
      </td>
      <td>{cost} $</td>
      <div className=" center gap`">
        <AnimatePresence mode="wait">
          <FadeElement cls="" key={state}>
            <td
              className="order-state"
              style={{
                width: 80,
                color: `var(--${state.split(" ").slice(-1)})`,
              }}
            >
              {state}
            </td>
          </FadeElement>
        </AnimatePresence>
        <OrderDropDown
          _id={_id}
          setOrderState={setOrderState}
          orderState={orderState}
        />
      </div>
    </>
  );
};

export default Order;
