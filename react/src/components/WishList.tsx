import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { opacityVariant, popVariant } from "../variants/globals";
import Favorite from "./widgets/Favorite";
import { useAppSelector } from "../custom/reduxTypes";
import SlideButton from "./widgets/SlideButton";

const WishList = ({ showFav }: { showFav: boolean }) => {
  const { fav } = useAppSelector((state) => state.fav);
  const [showClearFav, setShowClearFav] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {showFav && (
          <motion.div
            key={"fav-drop"}
            variants={popVariant}
            custom={{ dir: "" }}
            initial="start"
            animate="end"
            exit="exit"
            className="fav-drop"
          >
            <h3
              className="underline header white"
              style={{ width: "fit-content", margin: "10px 0 10px 5px" }}
            >
              your wishlist
            </h3>
            <div
              className="center"
              style={{ justifyContent: "flex-end", padding: "0 5px" }}
            >
              {" "}
              <button
                className="remove btn"
                style={{
                  background: "transparent",
                  fontSize: ".6rem",
                  color: "var(--delete)",
                }}
                onClick={() => setShowClearFav(true)}
              >
                clear All
              </button>
            </div>
            <AnimatePresence mode="wait">
              {fav.length >= 1 ? (
                <motion.div
                  className="center col"
                  variants={opacityVariant}
                  key={"fav-parent"}
                  initial="start"
                  exit={"exit"}
                  animate="end"
                >
                  <AnimatePresence>
                    {fav.map((arr) => {
                      return <Favorite key={arr.productId} {...arr} />;
                    })}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  variants={opacityVariant}
                  key={"no-data-fav-parent"}
                  initial="start"
                  exit={"exit"}
                  transition={{ duration: 0.4 }}
                  animate="end"
                  className="no-data-fav center"
                >
                  nothing on your favorites
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showClearFav && (
          <SlideButton
            key={"slide-button"}
            sethide={setShowClearFav}
            cls="clear-all"
            doneMsg="All CLeared"
            head="are you sure you want to clear ALl?"
            height={120}
          >
            {" "}
          </SlideButton>
        )}
      </AnimatePresence>
    </>
  );
};

export default WishList;
