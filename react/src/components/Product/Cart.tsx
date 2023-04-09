import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../custom/reduxTypes";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";
import Checkbox from "../../custom/checkbox";
import CircleCheckSvg from "../widgets/CircleCheckSvg";
import { AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (Array.isArray(cart)) {
      setSubTotal(cart.reduce((acc, cur) => acc + cur.price * cur.count, 0));
    }
  }, [cart]);

  return (
    <div className="cart-cont ">
      <div className="carts-par">
        <div className="offer-cart center between">
          <h3>Spend $800 or more and get free shipping!</h3>
          <AnimatePresence mode="wait">
            {subTotal >= 800 && (
              <CircleCheckSvg key={"circle-check1"} check={subTotal >= 800} />
            )}
          </AnimatePresence>
        </div>

        <div className="offer-cart center between">
          <h3>Spend $1000 or more and get 5% discount!</h3>
          <AnimatePresence mode="wait">
            {subTotal >= 1000 && (
              <CircleCheckSvg key={"circle-check2"} check={subTotal >= 1000} />
            )}
          </AnimatePresence>
        </div>

        {cart.map((item, index) => {
          return (
            <>
              <CartItem key={item._id} {...item} />
            </>
          );
        })}
      </div>
      <TotalPrice subTotal={subTotal} key={"TotalPrice"} />
    </div>
  );
};

export default Cart;
