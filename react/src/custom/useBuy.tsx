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
import { toast } from "react-hot-toast";
const useBuy = (arrProducts: cartInterface[]) => {
  const { email, userId } = useContext(isAuthContext);

  const handlePurchase = async () => {
    try {
      const { data: key } = await axios.get(getStripePublicKeyRoute());
      if (key) {
        const stripePromise = await loadStripe(key);
        const res = await axios.post(StripeRoute(userId), {
          products: arrProducts,
          email,
        });
        console.log(res.data);
        await stripePromise?.redirectToCheckout({
          sessionId: res.data.id,
        });
      }
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error((err as Error).message);
      }
    }
  };
  return { handlePurchase };
};

export default useBuy;
