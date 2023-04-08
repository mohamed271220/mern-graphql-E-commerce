import React from "react";
import { useAppSelector } from "../../custom/reduxTypes";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);
  console.log({ cart });
  return (
    <div className="cart-cont">
      {cart.map((item, index) => {
        return (
          <>
            <CartItem key={item.productId} {...item} />
          </>
        );
      })}
    </div>
  );
};

export default Cart;
