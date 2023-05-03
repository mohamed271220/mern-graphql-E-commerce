import React, { useContext, useEffect, useState } from "react";
import Checkbox from "../../../../custom SVGs/checkbox";
import Title from "../../../widgets/Title";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../../../variants/globals";
import FadeElement from "../../../widgets/FadeElement";
import StyledPrice from "../../../widgets/StyledPrice";
import { AiTwotoneDelete } from "react-icons/ai";
import { checkContext } from "../Orders";
import OpacityBtn from "../../../widgets/OpacityBtn";
import { BsInfoCircleFill } from "react-icons/bs";
import useDeleteOrder from "../../../../custom/useDeleteOrder";
import { HiDotsVertical } from "react-icons/hi";
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
const MobileOrder = ({
  deliveredAt,
  state,
  _id,
  cost,
  count,
  index,
  createdAt,
}: Props) => {
  const { arrOfOrders, setarrOfOrders, selectALl, setSlectALl, dataShown } =
    useContext(checkContext);
  const { handleDeleteOrder } = useDeleteOrder([_id]);
  const [orderState, setOrderState] = useState(state);

  return (
    <div className="order-mobile box-shadow">
      <span
        className="order-delete-mobile center gap "
        onClick={() => {
          handleDeleteOrder();
          setarrOfOrders([]);
        }}
      >
        <Title title={`delete this order`}>
          <AiTwotoneDelete fontSize={15} className="icon" />
        </Title>
        <Title title={`see order details`}>
          <BsInfoCircleFill className="icon " color="grey" fontSize={14} />
        </Title>
      </span>

      <span className="center" style={{ height: 20 }}></span>

      <div className="mobile-order-title">
        <span style={{ fontWeight: "bold" }} className="mobile-order-id">
          Order
          <span style={{ fontWeight: "normal" }}> #{_id}</span>
        </span>
        <div className="order-state-par center gap`">
          <AnimatePresence mode="wait">
            <FadeElement cls="" key={state}>
              <span
                style={{ background: `var(--${state.split(" ").slice(-1)})` }}
                className="order-state center gap"
              >
                {state}
              </span>
            </FadeElement>
          </AnimatePresence>
          <OrderDropDown
            _id={_id}
            setOrderState={setOrderState}
            orderState={orderState}
          />
        </div>
      </div>
      <span className="date">
        <span className="order-date">created at : </span>
        {new Date(createdAt).toLocaleDateString()} -{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </span>
      <span></span>
      <StyledPrice price={cost} />
    </div>
  );
};

export default MobileOrder;
