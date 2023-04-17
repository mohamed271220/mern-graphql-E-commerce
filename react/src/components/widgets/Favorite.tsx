import React from "react";
import { motion } from "framer-motion";
import { favArrInterface } from "../../context/isAuth";
import { useAppDispatch } from "../../custom/reduxTypes";
import { removeFromFavRedux } from "../../redux/favSlice";
import { useMutation } from "@apollo/client";
import { REMOVE_FROM_FAV } from "../../graphql/mutations/user";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { opacityVariant } from "../../variants/globals";
import { useNavigate } from "react-router-dom";

const Favorite = ({
  _id,
  price,
  title,
  productId,
  path,
  parentId,
}: favArrInterface) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [RemoveFromFav] = useMutation(REMOVE_FROM_FAV);

  return (
    <motion.div
      className="fav-product center"
      variants={opacityVariant}
      key={_id}
      initial="start"
      exit={"exit"}
      animate="end"
      transition={{ duration: 0.4 }}
    >
      <div className="fav-img center ">
        <img src={path} alt="" />
      </div>

      <div className="fav-content center shadow">
        <h3 className="fav-title ">{title}</h3>
        <span className="fav-price">$ {price}</span>
        <div className="product-links">
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
              dispatch(removeFromFavRedux([productId]));
              toast.success(res.data.removeFromFav.msg);
            }}
          >
            unsave
          </button>
          <button
            className="btn shadow"
            onClick={() => navigate(`/${parentId}`)}
          >
            details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Favorite;
