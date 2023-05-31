import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import NavLinks from "./NavLinks";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { mobileDropDownVariant } from "../../variants/globals.js";

const LinksAside = () => {
  const [showAside, setShowAside] = useState(false);

  return (
    <>
      <AiOutlineMenuUnfold
        color="black"
        onClick={() => setShowAside(!showAside)}
      />
      <AnimatePresence>
        {showAside && (
          <motion.aside
            key={"aside-links"}
            variants={mobileDropDownVariant}
            initial="start"
            animate="end"
            exit="exit"
            className="aside-links"
          >
            <NavLinks setShowAside={setShowAside} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default LinksAside;
