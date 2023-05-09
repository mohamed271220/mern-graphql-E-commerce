import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_ORDER } from "../../../../graphql/queries";
import DashMain from "../../DashMain";
import OrderDetailTr from "./OrderDetialTr";
import Customer from "./Customer";
import OrderSummery from "./OrderSummery";

const OrderDetails = () => {
  const { id } = useParams();

  const { data } = useQuery(GET_ORDER, { variables: { id } });
  console.log({ data, id });

  if (data?.order) {
    const { _id, productId, cost, userId, state, createdAt, deliveredAt } =
      data.order;
    return (
      <DashMain head="">
        <h2
          className="shadow  mobile-order-details 
            underline header
          "
          style={{
            margin: 6,

            color: "var(--secondary)",
            fontSize: "1.1rem",
          }}
        >
          <span style={{ color: "var(--wheat-light)" }} className="shadow">
            order{" "}
          </span>
          #{_id}
        </h2>

        <div className="order-details-grid">
          <table
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
          </table>
          <Customer state={state} userId={userId} cost={cost} />
          <OrderSummery
            created={createdAt}
            delivered={deliveredAt}
            total={cost}
          />
        </div>
      </DashMain>
    );
  } else {
    return <></>;
  }
};

export default OrderDetails;
