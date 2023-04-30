import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useContext } from "react";
import { isAuthContext } from "../context/isAuth";
import { ProductInterface } from "../interfaces/product";
import {
  StripeRoute,
  getStripePublicKeyRoute,
} from "../components/RestfulRoutes.js";
import { cartInterface } from "../interfaces/user";
const useBuy = (arrProducts: cartInterface[]) => {
  const { email } = useContext(isAuthContext);

  const handlePurchase = async () => {
    const { data: key } = await axios.get(getStripePublicKeyRoute());
    if (key) {
      const stripePromise = await loadStripe(key);
      const res = await axios.post(StripeRoute(), {
        products: arrProducts,
        email,
      });
      console.log(res.data);
      await stripePromise?.redirectToCheckout({
        sessionId: res.data.id,
      });
    }
  };
  return { handlePurchase };
};

export default useBuy;
