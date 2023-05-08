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
      <AnimatePresence>
        {arrOfOrders.length && (
          <FadeElement cls="delete-order" key={"delete-order"}>
            <div className=" center gap">
              <Title
                title={`delete ${arrOfOrders.length} order${
                  arrOfOrders.length >= 2 ? "s" : ""
                }`}
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
            </div>
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
