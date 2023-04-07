import React from "react";
import { motion } from "framer-motion";
import { favArrInterface } from "../../context/isAuth";
import { useAppDispatch } from "../../custom/reduxTypes";
import { removeFromFavRedux } from "../../redux/cartSlice";
import { useMutation } from "@apollo/client";
import { REMOVE_FROM_FAV } from "../../graphql/mutations/user";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const Favorite = ({ _id, price, title, productId, path }: favArrInterface) => {
  const dispatch = useAppDispatch();
  const [RemoveFromFav] = useMutation(REMOVE_FROM_FAV);

  return (
    <motion.div className="fav-product center">
      <div className="fav-img center ">
        <img src={path} alt="" />
      </div>

      <div className="fav-content center shadow">
        <h3 className="fav-title">{title}</h3>
        <span className="fav-price">$ {price}</span>
        <button
          className="btn unsave shadow"
          onClick={async () => {
            const userId = Cookies.get("user-id");
            const res = await RemoveFromFav({
              variables: {
                userId,
                productId,
              },
            });
            dispatch(removeFromFavRedux(productId));
            toast.success(res.data.removeFromFav.msg);
          }}
        >
          unsave
        </button>
      </div>
    </motion.div>
  );
};

export default Favorite;
