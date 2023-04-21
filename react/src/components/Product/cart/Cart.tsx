import React, { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../custom/reduxTypes";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";
import CircleCheckSvg from "../../../custom SVGs/CircleCheckSvg";
import { AnimatePresence } from "framer-motion";
import SLiderComponent from "../../widgets/SLider";
import { viewContext } from "../../../context/gridView";

const offerArr = [
  { offer: "Spend $800 or more and get free shipping!", money: 800 },
  { offer: "Spend $1000 or more and get 5% discount!", money: 1000 },
];

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (Array.isArray(cart)) {
      setSubTotal(cart.reduce((acc, cur) => acc + cur.price * cur.count, 0));
    }
  }, [cart]);

  const { setGridView } = useContext(viewContext);
  useEffect(() => {
    setGridView(true);
  }, []);

  return (
    <>
      <div className="cart-cont center col">
        <div className="offer-cart center col">
          {offerArr.map(({ offer, money }, i) => {
            return (
              <h3 className="head center between " key={i}>
                <span>{offer}</span>
                <AnimatePresence mode="wait">
                  {subTotal >= money && (
                    <CircleCheckSvg
                      key={"circle-check1"}
                      check={subTotal >= money}
                    />
                  )}
                </AnimatePresence>
              </h3>
            );
          })}
        </div>

        <div className="center row between w-100">
          <div className="carts-par center col">
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
      </div>
      <SLiderComponent key={"cart-slider"} />
    </>
  );
};

export default Cart;
