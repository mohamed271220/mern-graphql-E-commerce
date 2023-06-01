import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { opacityVariant } from "../../variants/globals";
import Favorite from "../widgets/Favorite";
import { useAppDispatch, useAppSelector } from "../../custom/reduxTypes";
import SlideButton from "../widgets/SlideButton";
import DropDown from "../widgets/DropDown";
import FadeElement from "../widgets/FadeElement";
import NoData from "../widgets/NoData";
import { useMutation } from "@apollo/client";
import { Clear_Fav } from "../../graphql/mutations/user.js";
import { clearAllFav } from "../../redux/favSlice";
import { isAuthContext } from "../../context/isAuth";

interface Props {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  showFav: boolean;
}
const WishList = ({ showFav, setter }: Props) => {
  const dispatch = useAppDispatch();
  const { userId } = useContext(isAuthContext);
  const { fav } = useAppSelector((state) => state.fav);
  const [showClearFav, setShowClearFav] = useState(false);

  const [IsStatus200, setIsStatus200] = useState(false);
  const [clearFav] = useMutation(Clear_Fav, {
    variables: {
      userId,
    },
  });
  const handleClearFav = async () => {
    const { data } = await clearFav();
    console.log({ data });
    if (data?.ClearFav?.status === 200) {
      setIsStatus200(true);
      dispatch(clearAllFav());
    } else {
      setIsStatus200(false);
    }
  };
  return (
    <>
      <DropDown
        cls="fav-drop"
        head=" your wishlist"
        bool={showFav}
        setter={setter}
      >
        <NoData length={fav.length} message="your wishlist is empty">
          <motion.div
            variants={opacityVariant}
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
          </motion.div>
          <AnimatePresence mode="wait">
            {fav.length >= 1 ? (
              <FadeElement key={"fav-parent"} cls="center col">
                <AnimatePresence>
                  {fav.map((arr) => {
                    return (
                      <Favorite key={arr.productId} {...arr} setter={setter} />
                    );
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
                fn={handleClearFav}
                IsStatus200={IsStatus200}
                isVaild
              >
                {" "}
              </SlideButton>
            )}
          </AnimatePresence>
        </NoData>
      </DropDown>
    </>
  );
};

export default WishList;
