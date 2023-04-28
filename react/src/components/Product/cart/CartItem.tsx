import React, { useContext } from "react";
import { cartInterface } from "../../../interfaces/user.js";
import Counter from "./Counter.js";
import OpacityBtn from "../../widgets/OpacityBtn.js";
import useRemoveFromCart from "../../../custom/useRemoveFromCart.js";
import { isAuthContext } from "../../../context/isAuth.js";
import { BsFillCartXFill, BsInfoLg } from "react-icons/bs";
import DetailsBtn from "../../widgets/DetailsBtn.js";
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
  const { handleRemoveFromCart } = useRemoveFromCart({
    userId,
    productId: [productId],
  });

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
          cls="btn remove "
          fn={handleRemoveFromCart}
          btn={""}
          Icon={BsFillCartXFill}
          title="remove from your cart list"
        />

        <DetailsBtn
          _id={parentId}
          btn=""
          cls="btn details"
          Icon={BsInfoLg}
          title="more details"
        />
      </div>
      <div>
        <OpacityBtn
          btn="purchase"
          fn={() => console.log("first")}
          cls="btn purchase"
        />
      </div>
    </div>
  );
};

export default CartItem;
