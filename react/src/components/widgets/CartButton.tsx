import React, { useContext } from "react";
import { motion } from "framer-motion";
import { BsFillCartPlusFill } from "react-icons/bs";

import { btnHover, opacityVariant } from "../../variants/globals";
import { Add_To_Cart } from "../../graphql/mutations/user";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { productContext } from "../product Route/Product";
import usePathAndId from "../../custom/usePathAndId";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../custom/reduxTypes";
import { addToCartRedux } from "../../redux/CartSlice";
const CartButton = () => {
  const [addToCart] = useMutation(Add_To_Cart);
  const { bigImgInd, images, price, title } = useContext(productContext);
  const [productId, path] = usePathAndId(images, bigImgInd);
  const dispatch = useAppDispatch();

  return (
    <motion.button
      className="btn wheat-light center"
      whileHover={btnHover}
      variants={opacityVariant}
      transition={{ duration: 0.4 }}
      animate="end"
      initial="start"
      exit="exit"
      onClick={async () => {
        const userId = Cookies.get("user-id");
        const res = await addToCart({
          variables: {
            userId,
            productId,
            path,
            price,
            title,
          },
        });
        dispatch(
          addToCartRedux({
            userId,
            productId,
            path,
            price,
            title,
            count: 1,
          })
        );
        toast.success(res.data.addToCart.msg);
      }}
    >
      <BsFillCartPlusFill className="icon" />
      Add To cart
    </motion.button>
  );
};

export default CartButton;
