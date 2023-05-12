import { Client_Url, Stripe_Public, Stripe_key } from "../config.js";
import { Request, Response, Router } from "express";
import { OrderCollection } from "../mongoose/schema/order.js";
import { RestfullAuth } from "../middlewares/auth.js";
import { userCollection } from "../mongoose/schema/user.js";

// const process = new stripe(Stripe_key);
const stripeData = require("stripe")(Stripe_key);

const stripeFn = async (req: Request, res: Response) => {
  const date = () => new Date();
  try {
    const userId = req.params.userid;
    const { products, email } = req.body;
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

    await OrderCollection.create({
      createdAt: date(),
      cost: session.amount_total / 100,
      userId,
      productId: products.map((e: any) => ({
        id: e._id,
        count: e.count,
        title: e.title,
        price: e.price,
        image: e.path,
      })),
      state: "pending",
      count: products.length,
    });

    const notificationObj = {
      isRead: false,
      content: `${email} created a new order`,
      createdAt: new Date().toISOString(),
    };
    console.log(notificationObj);
    await userCollection.updateMany(
      { role: { $in: ["admin", "moderator", "owner"] } },
      {
        $push: {
          notifications: notificationObj,
        },
        $inc: {
          notificationsCount: +1,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const getStripeublicKey = async (_: Request, res: Response) => {
  try {
    res.json(Stripe_Public);
  } catch (err) {
    console.log(err);
  }
};

const stripeRoutes = Router();

stripeRoutes.route("/stripe/:userid").post(RestfullAuth, stripeFn);
stripeRoutes.route("/getkey/stripe").get(RestfullAuth, getStripeublicKey);

export default stripeRoutes;
