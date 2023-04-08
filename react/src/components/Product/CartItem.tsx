import React from "react";
import { cartInterface } from "../../components/interfaces/user.js";
import Counter from "./Counter.js";
const CartItem = ({
  _id,
  productId,
  price,
  path,
  title,
  count,
}: cartInterface) => {
  return (
    <div className="cart-item center">
      <img className="cart-img" src={path} alt="" />
      <div className="center cart-content">
        <div>
          <span className="shadow detail">product:</span>
          <span className="shadow value">{title}</span>
        </div>

        <div>
          <span className="shadow detail">productId:</span>
          <span className="shadow value">{productId}</span>
        </div>

        <div>
          <span className="shadow detail">price:</span>
          <span className="shadow value">$ {price.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <Counter count={count} productId={productId} />
      </div>
    </div>
  );
};

export default CartItem;
