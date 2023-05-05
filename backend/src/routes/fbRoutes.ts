import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";
import passport from "passport";
import {
  ACCESS_TOKEN_SECRET,
  Client_Url,
  REFRESH_TOKEN_SECRET,
} from "../config";
import { userCollection } from "../mongoose/schema/user";

const fbSuccessLogin = async (req: Request, res: Response) => {
  const user: any = req.user;
  console.log("user");
  const location = req.query.location;
  const email = user?.emails[0]?.value;
  if (email) {
    const result: any = await userCollection.findOne({ email });
    console.log(result);
    if (result) {
      const expire = { expiresIn: "100h" };
      const accessToken = jwt.sign(
        { result },
        ACCESS_TOKEN_SECRET as unknown as string,
        expire
      );
      const refToken = jwt.sign(
        { result },
        REFRESH_TOKEN_SECRET as unknown as string,
        expire
      );
      const id = result._id.toString();
      res.cookie("user-email", result.email as unknown as string);
      res.cookie("user-id", id as unknown as string);
      res.cookie("access-token", accessToken);
      res.cookie("refresh-token", refToken);
      res.redirect(`${Client_Url}/${location}?isLogged=true`);
    } else {
      res.redirect(`${Client_Url}/login?isLogged=false`);
    }
  }
};

const successSignup = async (req: Request, res: Response) => {
  const user: any = req.user;
  const email = user?.emails[0]?.value;
  if (email) {
    const result = await userCollection.findOne({ email });
    if (result) {
      res.redirect(`${Client_Url}/signup?isRegistered=true`);
    } else {
      const obj = {
        image: user.photos[0].value,
        email: user?.emails[0].value,
        name: user.displayName,
      };

      res.redirect(
        `${Client_Url}/signup?user=` + encodeURIComponent(JSON.stringify(obj))
      );
    }
  }
};

export const fbOAuthRouter = Router();

fbOAuthRouter.route("/auth/signup/facebook").get((req, res, next) => {
  passport.authenticate("facebook", {
    scope: ["profile", "email"],
    state: "signup",
  })(req, res, next);
});

fbOAuthRouter.route("/auth/login/facebook").get((req, res, next) => {
  console.log("fb-login");
  passport.authenticate("facebook", {
    scope: ["profile"],
    // state: `login?location=${req.query.location}`,
  })(req, res, next);
});

fbOAuthRouter
  .route("/auth/facebook/callback")
  .get((req: any, res: any, next) => {
    console.log("1");
    const { state } = req.query;
    const str = state?.split("?");
    const login = str[0];
    const location = str[1]?.replace("location=", "");
    passport.authenticate("facebook", {
      successRedirect: `/auth/fb/success/${login}${
        login === "login" ? `?location=${location}` : ""
      }`,
      failureRedirect: `/auth/failure/${state}`,
    })(req, res, next);
  });

fbOAuthRouter.route("/auth/fb/success/login").get(fbSuccessLogin);
// fbOAuthRouter.route("/auth/failure/login").get(failLogin);
fbOAuthRouter.route("/auth/success/signup").get(successSignup);
