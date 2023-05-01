import React from "react";

interface Props {
  state: string;
  _id: string;
  cost: number;
  count: number;
}
const Order = ({ state, _id, cost, count }: Props) => {
  return <div>Order</div>;
};

export default Order;
