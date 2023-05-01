import React from "react";
import DashMain from "./DashMain";
import { useQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "../../graphql/queries.js";
import Order from "./Order";
const Orders = () => {
  const {
    data: { orders },
  } = useQuery(GET_ALL_ORDERS);
  console.log("data");
  console.log(orders);
  console.log(orders?._id);
  if (orders?.length) {
    return (
      <>
        <DashMain head="orders" key={"order-dashmain"}>
          {orders.map((order: any) => {
            return (
              <>
                <Order key={order.productId} {...order} />
              </>
            );
          })}
        </DashMain>
      </>
    );
  } else {
    return <></>;
  }
};

export default Orders;
