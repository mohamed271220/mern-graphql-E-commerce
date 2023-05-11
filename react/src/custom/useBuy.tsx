import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useContext } from "react";
import { isAuthContext } from "../context/isAuth";
import { ProductInterface } from "../interfaces/product";
import { StripeRoute, getStripePublicKeyRoute } from "../RestfulRoutes.js";
import { cartInterface } from "../interfaces/user";
import { toast } from "react-hot-toast";
import { getnewAccess } from "../main";
const useBuy = (arrProducts: cartInterface[]) => {
  const { email, userId } = useContext(isAuthContext);

  const handlePurchase = async () => {
    try {
      const newAccessToken = await getnewAccess();
      const { data: key } = await axios.get(getStripePublicKeyRoute(), {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
      console.log(newAccessToken);
      if (key) {
        const stripePromise = await loadStripe(key);
        const res = await axios.post(
          StripeRoute(userId),
          {
            products: arrProducts,
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );
        await stripePromise?.redirectToCheckout({
          sessionId: res.data.id,
        });
      }
    } catch (err: unknown) {
      console.log(err);
      if ((err as Error).message === "Request failed with status code 401") {
        toast.error("Unauthorized access. Please login");
      }
    }
  };
  return { handlePurchase };
};

export default useBuy;
