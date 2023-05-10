import React, { useContext, useState } from "react";
import Title from "../../../widgets/Title";
import { AnimatePresence } from "framer-motion";
import FadeElement from "../../../widgets/FadeElement";
import StyledPrice from "../../../widgets/StyledPrice";
import { AiTwotoneDelete } from "react-icons/ai";
import { checkContext } from "../Orders";
import useDeleteOrder from "../../../../custom/useDeleteOrder";
import OrderDetailsIcon from "../OrderDetailsIcon";
import DashDropDown from "../DashDropDown";
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
  const { setarrOfOrders } = useContext(checkContext);
  const { handleDeleteOrder } = useDeleteOrder([_id]);
  const [orderState, setOrderState] = useState(state);
  return (
    <div className="order-mobile box-shadow">
      <span className="order-delete-mobile center gap ">
        <Title title={`delete this order`}>
          <AiTwotoneDelete
            fontSize={15}
            className="icon"
            onClick={() => {
              handleDeleteOrder();
              setarrOfOrders([]);
            }}
          />
        </Title>
        <OrderDetailsIcon _id={_id} />
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
          <DashDropDown
            arr={["pending", "shipped", "delivered", "canceled", "on hold"]}
            _id={_id}
            setter={setOrderState}
            state={orderState}
          />
        </div>
      </div>
      <span className="date" style={{ marginTop: 6 }}>
        <span className="order-date">created at : </span>
        &#160; {new Date(createdAt).toLocaleDateString()} -{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </span>
      <span className="date " style={{ display: "flex" }}>
        <span className="order-date">delivred at : </span>
        <AnimatePresence mode="wait">
          <FadeElement cls="" key={deliveredAt}>
            &#160;{" "}
            {deliveredAt
              ? `${new Date(deliveredAt).toLocaleDateString()} -
          ${new Date(deliveredAt).toLocaleTimeString()}`
              : "not delvired yet"}
          </FadeElement>
        </AnimatePresence>
      </span>
      <StyledPrice price={cost} />
    </div>
  );
};

export default MobileOrder;
