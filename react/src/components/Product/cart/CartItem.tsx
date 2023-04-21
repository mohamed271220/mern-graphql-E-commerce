import React from "react";
import { cartInterface } from "../../../interfaces/user.js";
import Counter from "./Counter.js";
import HeartSvgProduct from "../../../custom SVGs/HeartSvgProduct.js";
import Remove_From_Cart_Btn from "../../widgets/Remove-From-Cart_Btn.js";

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
        <Remove_From_Cart_Btn id={productId} content={"remove"} />
      </div>
    </div>
  );
};

export default CartItem;
