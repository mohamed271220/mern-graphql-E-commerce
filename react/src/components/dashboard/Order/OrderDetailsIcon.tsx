import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import Title from "../../widgets/Title";
import { useNavigate } from "react-router-dom";

const OrderDetailsIcon = ({ _id }: { _id: string }) => {
  const navigate = useNavigate();

  return (
    <Title title={`see order details`}>
      <BsInfoCircleFill
        className="icon"
        color="grey"
        fontSize={14}
        onClick={() => navigate(`/dashboard/orders/${_id}`)}
      />
    </Title>
  );
};

export default OrderDetailsIcon;
