import passport from "passport";
import { FB_ID, FB_Secret } from "../config";

const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: FB_ID,
      clientSecret: FB_Secret,
      callbackURL: "/auth/facebook/callback",
    },
    function (_: any, _n: any, profile: any, done: any) {
      console.log(profile);
      done(null, profile);
    }
  )
);
passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
