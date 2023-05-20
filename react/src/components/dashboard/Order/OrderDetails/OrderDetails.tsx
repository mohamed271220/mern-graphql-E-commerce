import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_ORDER } from "../../../../graphql/queries";
import DashMain from "../../DashMain";
import OrderDetailTr from "./OrderDetialTr";
import Customer from "./Customer";
import OrderSummery from "./OrderSummery";
import { motion } from "framer-motion";
import { parentVariant, reverseVariant } from "../../../../variants/globals";
import Animation from "../../../widgets/Animation";
const OrderDetails = () => {
  const { id } = useParams();

  const { data } = useQuery(GET_ORDER, { variables: { id } });
  console.log({ data, id });

  if (data?.order) {
    const { _id, productId, cost, userId, state, createdAt, deliveredAt } =
      data.order;
    return (
      <DashMain head="">
        <Animation addIntialX={false}>
          <motion.div
            variants={parentVariant}
            // initial="start"
            // animate="end"
            custom={0.4}
            className="order-details-grid"
          >
            <motion.table
              variants={reverseVariant}
              custom={"first"}
              className="table-order-detail box-shadow"
              style={{ width: "100%" }}
            >
              <th>items summary</th>
              <th>QTY</th>
              <th>Price</th>
              <th>total price</th>
              {productId.map((ob: any, i: number) => {
                return (
                  <>
                    <OrderDetailTr OrderDetailTr key={ob._id} {...ob} />
                  </>
                );
              })}
            </motion.table>
            <Customer state={state} userId={userId} cost={cost} />
            <OrderSummery
              created={createdAt}
              delivered={deliveredAt}
              total={cost}
            />
          </motion.div>
        </Animation>
      </DashMain>
    );
  } else {
    return <></>;
  }
};

export default OrderDetails;
