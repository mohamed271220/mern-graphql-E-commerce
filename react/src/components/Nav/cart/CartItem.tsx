import React, { useContext } from "react";
import { cartInterface } from "../../../interfaces/user.js";
import Counter from "./Counter.js";
import OpacityBtn from "../../widgets/OpacityBtn.js";
import useRemoveFromCart from "../../../custom/useRemoveFromCart.js";
import { isAuthContext } from "../../../context/isAuth.js";
import { BsFillCartXFill, BsInfoLg } from "react-icons/bs";
import DetailsBtn from "../../widgets/DetailsBtn.js";
import axios from "axios";
import { useAppSelector } from "../../../custom/reduxTypes.js";
import useBuy from "../../../custom/useBuy.js";

const CartItem = ({
  _id,
  productId,
  parentId,
  price,
  path,
  title,
  count,
}: cartInterface) => {
  const detailsArr = [
    { detail: "product", value: title },
    { detail: "productId", value: productId },
    { detail: "price", value: `$ ${price.toFixed(2)}` },
  ];
  const { userId } = useContext(isAuthContext);
  const { cart } = useAppSelector((state) => state.cart);
  const { handleRemoveFromCart } = useRemoveFromCart({
    userId,
    productId: [productId],
  });
  const obj = cart.find((item) => item._id === _id);
  const { handlePurchase } = useBuy([obj] as unknown as cartInterface[]);

  return (
    <div className="cart-item center between">
      <img className="cart-img" src={path} alt="" />
      <div className="center cart-content col">
        <div style={{ alignSelf: "center" }}>
          <Counter count={count} productId={productId} key={_id} />
        </div>
        {detailsArr.map(({ detail, value }, i) => {
          return (
            <div key={i}>
              <span className="shadow cart-detail">{detail}:</span>
              <span className="shadow cart-value">{value}</span>
            </div>
          );
        })}
      </div>
      <div className="cart-btns center gap ">
        <OpacityBtn
          cls="btn remove"
          fn={handleRemoveFromCart}
          btn={""}
          Icon={BsFillCartXFill}
          title="remove from your cart list"
        />

        <DetailsBtn
          _id={parentId}
          btn=""
          cls="btn details details-cart"
          Icon={BsInfoLg}
          title="more details"
        />
      </div>
      <div>
        <OpacityBtn btn="purchase" fn={handlePurchase} cls="btn purchase" />
      </div>
    </div>
  );
};

export default CartItem;
