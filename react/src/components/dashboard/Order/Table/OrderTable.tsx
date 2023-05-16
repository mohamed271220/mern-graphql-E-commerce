import React, { useContext } from "react";
import Checkbox from "../../../../custom SVGs/checkbox";
import Title from "../../../widgets/Title";
import { AnimatePresence, motion } from "framer-motion";
import { AiTwotoneDelete } from "react-icons/ai";
import useDeleteOrder from "../../../../custom/useDeleteOrder";
import FadeElement from "../../../widgets/FadeElement";
import { checkContext } from "../Orders";
import { GrUpgrade } from "react-icons/gr";
import Order from "./Order";
import { opacityVariant } from "../../../../variants/globals";

const OrderTable = () => {
  const { arrOfOrders, setarrOfOrders, selectALl, setSlectALl, dataShown } =
    useContext(checkContext);

  const { handleDeleteOrder } = useDeleteOrder(arrOfOrders);
  return (
    <table className="order box-shadow">
      <AnimatePresence mode="wait">
        {arrOfOrders.length >= 1 && (
          <FadeElement cls="center gap delete-order" key={"delete-order"}>
            <Title
              title={`delete ${arrOfOrders.length} order${
                arrOfOrders.length >= 2 ? "s" : ""
              }`}
              dir="left"
              abs
            >
              <span
                onClick={() => {
                  handleDeleteOrder();
                  setarrOfOrders([]);
                }}
              >
                <AiTwotoneDelete className="icon " />
              </span>
            </Title>
          </FadeElement>
        )}
      </AnimatePresence>
      <thead>
        <th className="center">
          <Title
            title={selectALl === "all" ? "unselect all" : "select all orders"}
            dir="left"
          >
            <Checkbox
              filter={"all"}
              isChecked={selectALl}
              setIsChecked={setSlectALl}
            />{" "}
          </Title>
        </th>
        <th> order id</th>
        <th> created At</th>
        <th>delivered At</th>
        <th> total </th>
        <th style={{ width: 150 }}> order state </th>
      </thead>

      <AnimatePresence>
        {dataShown.map((order: any, i: number) => {
          return (
            <motion.tr
              key={order._id}
              variants={opacityVariant}
              initial="start"
              animate="end"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <Order index={i} {...order} />
            </motion.tr>
          );
        })}
      </AnimatePresence>
    </table>
  );
};

export default OrderTable;
