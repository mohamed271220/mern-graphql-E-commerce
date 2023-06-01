import { AnimatePresence, motion } from "framer-motion";
import React, { RefObject } from "react";
import { mobileDropDownVariant, popVariant } from "../../variants/globals";
import { ChildrenInterFace } from "../../interfaces/general";
import useClickOutside from "../../custom/useClickOutside";
import useIsMobile from "../../custom/useIsMobile";

interface Props extends ChildrenInterFace {
  bool: boolean;
  head?: string;
  cls: string;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown = ({ bool, head, cls, setter, children }: Props) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    setter(false);
  }, bool);
  const { isMobile } = useIsMobile();

  return (
    <>
      <AnimatePresence mode="wait">
        {bool && (
          <motion.div
            ref={ref}
            key={"fav-drop" + "_" + head}
            variants={isMobile ? mobileDropDownVariant : popVariant}
            custom={{ dir: "" }}
            initial="start"
            animate="end"
            exit="exit"
            className={`dropdown ${cls}`}
          >
            {head && (
              <h3
                className="underline header "
                style={{
                  width: "fit-content",
                  margin: "10px 0 10px 5px",
                }}
              >
                {head}
              </h3>
            )}

            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DropDown;
