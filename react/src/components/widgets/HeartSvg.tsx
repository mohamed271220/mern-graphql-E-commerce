import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../custom/reduxTypes";
import { isAuthContext } from "../../context/isAuth";
import { favInterface } from "../interfaces/user";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { addToFavRedux, removeFromFavRedux } from "../../redux/cartSlice";
import { Add_To_Fav, REMOVE_FROM_FAV } from "../../graphql/mutations/user";

interface Props {
  setIsFavorited: React.Dispatch<React.SetStateAction<boolean>>;
  isFavoraited: boolean;
  _id: string;
}

const HeartSvg = ({ isFavoraited, setIsFavorited, _id }: Props) => {
  // console.log({ isFavoraited });
  const heartVariant = {
    start: {
      pathLength: isFavoraited ? 0 : 1,
      pathOffset: isFavoraited ? 0 : 0.1,
      stroke: "black",
    },
    end: {
      pathLength: isFavoraited ? 1 : 0,
      pathOffset: isFavoraited ? 0.1 : 0,
      stroke: "red",
      transition: { duration: 0.8 },
    },
  };

  const { fav: favContext } = useContext(isAuthContext);

  const { fav: favArr } = useAppSelector((state) => state.fav);

  useEffect(() => {
    if (favArr.length > 0) {
      const check = favArr.some((e: favInterface) => _id == e.productId);
      console.log({ check, favArr, _id });
      if (check) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    }
  }, [favContext]);

  const [addToFav, { data: addfavData }] = useMutation(Add_To_Fav);
  const [RemoveFromFav, { data: removefavData }] = useMutation(REMOVE_FROM_FAV);

  const dispatch = useAppDispatch();

  return (
    <span className="heart-parent ">
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        onClick={async () => {
          setIsFavorited(!isFavoraited);
          const userId = Cookies.get("user-id");
          if (isFavoraited) {
            const res = await RemoveFromFav({
              variables: {
                userId,
                productId: _id,
              },
            });
            console.log(res);

            dispatch(removeFromFavRedux(_id));
          } else {
            const res = await addToFav({
              variables: {
                userId,
                productId: _id,
              },
            });
            console.log(res);
            dispatch(addToFavRedux(_id));
          }
        }}
      >
        <motion.path
          variants={heartVariant}
          initial="start"
          animate="end"
          d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
        />
      </svg>
    </span>
  );
};

export default HeartSvg;

{
  /* <AnimatePresence mode="wait">
              {!addToFavorate ? (
                <motion.span
                  variants={opacityVariant}
                  initial="start"
                  animate="end"
                  exit="exit"
                  key={"add to favorite"}
                  transition={{ duration: 0.8 }}
                >
                  add to favorite
                </motion.span>
              ) : (
                <motion.span
                  variants={opacityVariant}
                  initial="start"
                  animate="end"
                  key={"remove from favorites"}
                  exit="exit"
                  transition={{ duration: 0.8 }}
                >
                  remove from favorites
                </motion.span>
              )}
            </AnimatePresence> */
}
