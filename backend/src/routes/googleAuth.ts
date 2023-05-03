import { Request, Response, Router } from "express";
import passport from "passport";
import { Client_Url } from "../config";
import { userCollection } from "../mongoose/schema/user";

const success = async (req: Request, res: Response) => {
  const user: any = req.user;
  console.log(req.user);
  const email = user?.emails[0]?.value;
  if (email) {
    const result = await userCollection.findOne({ email });
    if (result) {
      res.redirect(`${Client_Url}`);
    } else {
      const obj = {
        image: user.photos[0].value,
        email: user?.emails[0].value,
        name: user.displayName,
      };

      console.log(obj);
      res.redirect(
        `${Client_Url}/signup?user=` + encodeURIComponent(JSON.stringify(obj))
      );
    }
  }
};

const failure = async (req: Request, res: Response) => {
  const user: any = req.user;

  //   res.redirect(
  //     `${Client_Url}/signup?user=` + encodeURIComponent(JSON.stringify(profile))
  //   );
};

export const oAuthRouter = Router();

oAuthRouter
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

oAuthRouter.route("/auth/google/callback").get(
  passport.authenticate("google", {
    successRedirect: `/auth/success`,
    failureRedirect: "/auth/failure",
  })
);
oAuthRouter.route("/auth/success").get(success);
oAuthRouter.route("/auth/failed").get(failure);

// const failed = async (req: Request, res: Response) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// };

// const success = (req: Request, res: Response) => {
//   // if (req.user) {
//   //   console.log(req.user);
//   //   res.status(200).json({
//   //     success: true,
//   //     message: "successfull",
//   //     user: req.user,
//   //     //   cookies: req.cookies
//   //   });
//   // }
//   // (req, res, () => {
//   console.log("runs");
//   const profile = req.user;
//   console.log(req.user);
//   res.redirect(
//     `${Client_Url}/signup?user=` + encodeURIComponent(JSON.stringify(profile))
//   );
//   // });
// };

// const failedSignup = async (req: Request, res: Response) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// };

// const fn = async (req: any, res: any) => {
//   const mode = req.query.mode;
//   console.log("mode", mode);
//   // if (mode === "signup") {
//   //   console.log("runs");
//   // passport.authenticate("google", {
//   //   successRedirect: `/auth/${mode}/success`,
//   //   failureRedirect: "/auth/signup/failure",
//   });
//   // } else {
//   //   passport.authenticate("google", {
//   //     successRedirect: "/auth/login/success",
//   //     failureRedirect: "/auth/login/failure",
//   //   });
//   // }
// };
