import React from "react";
import { cartInterface } from "../../../interfaces/user.js";
import Counter from "./Counter.js";
import HeartSvgProduct from "../../../custom SVGs/HeartSvgProduct.js";
import RemoveFromCart from "../../widgets/RemoveFromCart.js";

const CartItem = ({
  _id,
  productId,
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
      <div>
        <RemoveFromCart id={productId} />
      </div>
    </div>
  );
};

export default CartItem;
