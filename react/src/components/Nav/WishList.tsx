import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { opacityVariant } from "../../variants/globals";
import Favorite from "../widgets/Favorite";
import { useAppSelector } from "../../custom/reduxTypes";
import SlideButton from "../widgets/SlideButton";
import DropDown from "../widgets/DropDown";
import FadeElement from "../widgets/FadeElement";

const WishList = ({ showFav }: { showFav: boolean }) => {
  const { fav } = useAppSelector((state) => state.fav);
  const [showClearFav, setShowClearFav] = useState(false);

  return (
    <>
      <DropDown cls="fav-drop" head=" your wishlist" bool={showFav}>
        <div
          className="center"
          style={{ justifyContent: "flex-end", padding: "0 5px" }}
        >
          <button
            className=" btn"
            style={{
              background: "transparent",
              color: "var(--delete)",
              fontSize: ".7rem",
            }}
            onClick={() => setShowClearFav(true)}
          >
            clear All
          </button>
        </div>
        <AnimatePresence mode="wait">
          {fav.length >= 1 ? (
            <FadeElement key={"fav-parent"} cls="center col">
              <AnimatePresence>
                {fav.map((arr) => {
                  return <Favorite key={arr.productId} {...arr} />;
                })}
              </AnimatePresence>
            </FadeElement>
          ) : (
            <FadeElement key={"no-data-fav"} cls="shadow no-data-fav center">
              no data in your wishlist
            </FadeElement>
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
              fn={() => null}
            >
              {" "}
            </SlideButton>
          )}
        </AnimatePresence>
      </DropDown>
    </>
  );
};

export default WishList;
