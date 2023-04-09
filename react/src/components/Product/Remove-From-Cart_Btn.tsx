import React from "react";
import { motion } from "framer-motion";
import { btnHover, btnTap, opacityVariant } from "../../variants/globals";
import { useMutation } from "@apollo/client";
import { REMOVE_FROM_Cart } from "../../graphql/mutations/user";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../custom/reduxTypes";
import { removeFromCartRedux } from "../../redux/CartSlice";
import { BsFillCartXFill } from "react-icons/bs";

const Remove_From_Cart_Btn = ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const [removeFrpmCartDB] = useMutation(REMOVE_FROM_Cart);
  const dispatch = useAppDispatch();
  return (
    <motion.button
      variants={opacityVariant}
      transition={{ duration: 0.4 }}
      animate="end"
      initial="start"
      exit="exit"
      className="btn remove center"
      whileHover={btnHover}
      whileTap={btnTap}
      onClick={async () => {
        const userId = Cookies.get("user-id");
        const res = await removeFrpmCartDB({
          variables: {
            userId,
            productId: id,
          },
        });
        dispatch(removeFromCartRedux([id]));
        console.log(res);
      }}
    >
      {" "}
      <BsFillCartXFill className="icon" />
      <span>{content} </span>
    </motion.button>
  );
};

export default Remove_From_Cart_Btn;
