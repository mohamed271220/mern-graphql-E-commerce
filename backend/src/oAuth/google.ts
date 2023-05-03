import passport from "passport";
import { GooGle_Secret, Google_Client_ID } from "../config";
import { Request } from "express";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: Google_Client_ID,
      clientSecret: GooGle_Secret,
      callbackURL: "/auth/google/callback",
    },
    function (_: any, _n: any, profile: any, done: any) {
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
