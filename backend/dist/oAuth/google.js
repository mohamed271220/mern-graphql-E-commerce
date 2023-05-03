"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const config_1 = require("../config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport_1.default.use(new GoogleStrategy({
    clientID: config_1.Google_Client_ID,
    clientSecret: config_1.GooGle_Secret,
    callbackURL: "/auth/google/callback",
}, function (_, _n, profile, done) {
    done(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
