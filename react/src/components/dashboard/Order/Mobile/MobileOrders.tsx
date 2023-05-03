import React, { useContext, useEffect } from "react";
import { checkContext } from "../Orders";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../../../variants/globals";
import useDeleteOrder from "../../../../custom/useDeleteOrder";
import MobileOrder from "./MobileOrder";
const MobileOrders = () => {
  const { arrOfOrders, setarrOfOrders, selectALl, setSlectALl, dataShown } =
    useContext(checkContext);

  // const { handleDeleteOrder } = useDeleteOrder(arrOfOrders);

  useEffect(() => {
    setSlectALl("");
  }, []);

  return (
    <div className="">
      <AnimatePresence>
        {dataShown.map((order: any, i: number) => {
          return (
            <motion.div
              key={order._id}
              variants={opacityVariant}
              initial="start"
              animate="end"
              exit="exit"
              transition={{ duration: 0.5 }}
              className=" mobile-order-par"
            >
              <MobileOrder index={order._id} {...order} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default MobileOrders;
