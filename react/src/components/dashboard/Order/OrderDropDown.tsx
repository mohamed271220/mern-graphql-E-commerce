import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Title from "../../widgets/Title";
import { AnimatePresence, motion } from "framer-motion";
import FadeElement from "../../widgets/FadeElement";
import {
  opacityVariant,
  selectDropDownVariants,
} from "../../../variants/globals";
import useUpdateOrder from "../../../custom/useUpdateOrder";

const stateArr = ["pending", "shipped", "delivered", "canceled", "on hold"];

interface Props {
  orderState: string;
  setOrderState: React.Dispatch<React.SetStateAction<string>>;
  _id: string;
}

const OrderDropDown = ({ orderState, setOrderState, _id }: Props) => {
  const [isSClicked, setIsCLicked] = useState(false);

  const handleToggle = () => setIsCLicked(!isSClicked);
  const { handleUpdateOrder } = useUpdateOrder(_id, orderState);

  return (
    <div className="relative">
      <Title title={isSClicked ? "update order state" : ""}>
        <HiDotsVertical className="icon" onClick={handleToggle} />
      </Title>
      <AnimatePresence>
        {isSClicked && (
          // <FadeElement
          //   key={"order-drop"}
          //   transition={0.8}
          //   cls="order-drop box-shadow"
          // >
          <motion.div
            className="order-drop box-shadow"
            variants={selectDropDownVariants}
            initial="start"
            animate="end"
            exit="exit"
          >
            <>
              {stateArr.map((st, i) => {
                return (
                  <motion.div
                    style={{
                      color:
                        st === orderState ? `var(--${st})` : "var(--wheat)",
                      cursor: "pointer",
                    }}
                    variants={opacityVariant}
                    onClick={() => {
                      setIsCLicked(false);
                      handleUpdateOrder();
                    }}
                    key={i}
                    whileHover={{ x: 4 }}
                    onTapStart={() => setOrderState(st)}
                    className="order-link"
                  >
                    {st}
                  </motion.div>
                );
              })}
            </>
          </motion.div>
          // </FadeElement>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderDropDown;
