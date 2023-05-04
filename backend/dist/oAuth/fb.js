"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const config_1 = require("../config");
const FacebookStrategy = require("passport-facebook").Strategy;
passport_1.default.use(new FacebookStrategy({
    clientID: config_1.FB_ID,
    clientSecret: config_1.FB_Secret,
    callbackURL: "/auth/facebook/callback",
}, function (_, _n, profile, done) {
    console.log(profile);
    done(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
