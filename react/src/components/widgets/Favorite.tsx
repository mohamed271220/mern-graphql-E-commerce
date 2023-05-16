import React, { useContext } from "react";
import { motion } from "framer-motion";
import { favArrInterface, isAuthContext } from "../../context/isAuth";
import { opacityVariant } from "../../variants/globals";
import { useNavigate } from "react-router-dom";
import useRemoveFromFav from "../../custom/useRemoveFeomFav";

const Favorite = ({
  _id,
  price,
  title,
  productId,
  path,
  parentId,
}: favArrInterface) => {
  const navigate = useNavigate();
  const { userId } = useContext(isAuthContext);
  const { handleRemoveFromFav } = useRemoveFromFav({
    userId,
    productId: [productId as string],
  });
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
          <button className="btn unsave shadow" onClick={handleRemoveFromFav}>
            unsave
          </button>
          <button
            className="btn shadow "
            style={{ color: "var(--white" }}
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
