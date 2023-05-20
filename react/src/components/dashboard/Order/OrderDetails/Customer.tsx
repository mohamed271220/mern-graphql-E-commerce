import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_USER_DATA } from "../../../../graphql/mutations/user";
import { date } from "yup";
import OrderDetail from "../Table/OrderDetail";
import { motion } from "framer-motion";
import { reverseVariant } from "../../../../variants/globals";
interface Props {
  userId: string;
  state: string;
  cost: number;
}
const Customer = ({ userId, state, cost }: Props) => {
  const [getUser, { data }] = useMutation(GET_USER_DATA, {
    variables: { id: userId },
  });

  useEffect(() => {
    getUser();
  }, []);
  if (data?.getUserData) {
    const { name, email } = data.getUserData;
    const dataArr = [
      { span: "customer name", value: name },
      { span: "customer email", value: email },
      { span: "order state", value: state },
      { span: "total", value: `$ ${cost}` },
      { span: "note", value: "N/A" },
    ];
    return (
      <motion.div
        variants={reverseVariant}
        custom={"first"}
        className="box-shadow customer"
      >
        <h2>customer and order details</h2>
        <div className="hr"></div>

        {dataArr.map((obj, i) => {
          return (
            <>
              <OrderDetail key={i} {...obj} />
              <div className="hr"></div>
            </>
          );
        })}
      </motion.div>
    );
  } else {
    return <></>;
  }
};

export default Customer;
