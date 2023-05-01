import * as stripe from "stripe";
import { Client_Url, Stripe_Public, Stripe_key } from "../config.js";
import { Request, Response, Router } from "express";

// const process = new stripe(Stripe_key);
const stripeData = require("stripe")(Stripe_key);

const stripeFn = async (req: Request, res: Response) => {
  try {
    const { products, email } = req.body;
    console.log(req.body);
    console.log(products);
    const lineItems = await Promise.all(
      products.map((item: any) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.count,
        };
      })
    );

    const session = await stripeData.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${Client_Url}?success=true`,
      cancel_url: `${Client_Url}?success=false`,
      payment_method_types: ["card"],
      customer_email: email,
    });

    res.json(session);
  } catch (err) {
    console.log(err);
  }
};

const getStripeublicKey = async (req: Request, res: Response) => {
  try {
    res.json(Stripe_Public);
  } catch (err) {
    console.log(err);
  }
};

const stripeRoutes = Router();

stripeRoutes.route("/stripe").post(stripeFn);
stripeRoutes.route("/getkey/stripe").get(getStripeublicKey);

export default stripeRoutes;
