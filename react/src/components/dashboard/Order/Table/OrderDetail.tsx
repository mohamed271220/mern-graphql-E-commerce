import React from "react";

interface Props {
  span: string;
  value: string;
}
const OrderDetail = ({ span, value }: Props) => {
  return (
    <div className="order-detail center between w-100">
      <span>{span}</span>
      <span>{value}</span>
    </div>
  );
};

export default OrderDetail;
