import React, { useContext } from "react";
import { cartInterface } from "../../../interfaces/user.js";
import Counter from "./Counter.js";
import HeartSvgProduct from "../../../custom SVGs/HeartSvgProduct.js";
import CartBtn from "../../widgets/CartBtn.js";
import OpacityBtn from "../../widgets/OpacityBtn.js";
import useRemoveFromCart from "../../../custom/useRemoveFromCart.js";
import { isAuthContext } from "../../../context/isAuth.js";
import { BsFillCartXFill } from "react-icons/bs";
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
  console.log({ parentId });
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
        <DetailsBtn
          _id={parentId}
          btn="more details"
          cls="btn more-details details"
        />
      </div>
      <OpacityBtn
        cls="btn remove remove-cart"
        fn={handleRemoveFromCart}
        btn={""}
        Icon={BsFillCartXFill}
      />
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
