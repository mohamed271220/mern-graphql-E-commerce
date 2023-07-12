import React, { useContext, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Title from "../../widgets/Title";
import { AnimatePresence, motion } from "framer-motion";
import {
  opacityVariant,
  selectDropDownVariants,
} from "../../../variants/globals";
import useUpdateOrder from "../../../custom/useUpdateOrder";
import { isAuthContext } from "../../../context/isAuth";
import useUpdateUserRole from "../../../custom/useUpdateUserRole";
import { themeContext } from "../../../context/ThemContext";

interface Props {
  state: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  _id: string;
  arr: string[];
  type?: string;
}

const DashDropDown = ({ type, state, setter, _id, arr }: Props) => {
  const { isAuth } = useContext(isAuthContext);
  const { theme } = useContext(themeContext);
  const [isSClicked, setIsCLicked] = useState(false);

  const handleToggle = () => setIsCLicked(!isSClicked);
  const { handleUpdateOrder } = useUpdateOrder(_id, state);
  const { handleUpdateUserRole } = useUpdateUserRole(_id, state);
  return (
    <div className="relative">
      <Title title={isSClicked ? "update order state" : ""}>
        <HiDotsVertical
          className="icon"
          onClick={handleToggle}
          color={theme === "light" ? "grey" : "var(--white)"}
        />
      </Title>
      <AnimatePresence>
        {isSClicked && (
          <motion.div
            className="order-drop box-shadow"
            variants={selectDropDownVariants}
            initial="start"
            animate="end"
            exit="exit"
          >
            <>
              {arr.map((st, i) => {
                return (
                  <motion.div
                    style={{
                      color: st === state ? `var(--${st})` : "var(--wheat)",
                      cursor: "pointer",
                    }}
                    variants={opacityVariant}
                    onClick={() => {
                      setIsCLicked(false);
                      if (type === "user") {
                        handleUpdateUserRole();
                      } else {
                        handleUpdateOrder();
                      }
                    }}
                    key={i}
                    onTapStart={() => {
                      if (isAuth) {
                        setter(st);
                      }
                    }}
                    className="order-link select-opt"
                  >
                    {st}
                  </motion.div>
                );
              })}
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashDropDown;
