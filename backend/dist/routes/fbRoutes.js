"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fbOAuthRouter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const config_1 = require("../config");
const user_1 = require("../mongoose/schema/user");
const fbSuccessLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = req.user;
    console.log("user");
    const location = req.query.location;
    const email = (_a = user === null || user === void 0 ? void 0 : user.emails[0]) === null || _a === void 0 ? void 0 : _a.value;
    if (email) {
        const result = yield user_1.userCollection.findOne({ email });
        console.log(result);
        if (result) {
            const expire = { expiresIn: "100h" };
            const accessToken = jsonwebtoken_1.default.sign({ result }, config_1.ACCESS_TOKEN_SECRET, expire);
            const refToken = jsonwebtoken_1.default.sign({ result }, config_1.REFRESH_TOKEN_SECRET, expire);
            const id = result._id.toString();
            res.cookie("user-email", result.email);
            res.cookie("user-id", id);
            res.cookie("access-token", accessToken);
            res.cookie("refresh-token", refToken);
            res.redirect(`${config_1.Client_Url}/${location}?isLogged=true`);
        }
        else {
            res.redirect(`${config_1.Client_Url}/login?isLogged=false`);
        }
    }
});
const successSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = req.user;
    const email = (_b = user === null || user === void 0 ? void 0 : user.emails[0]) === null || _b === void 0 ? void 0 : _b.value;
    if (email) {
        const result = yield user_1.userCollection.findOne({ email });
        if (result) {
            res.redirect(`${config_1.Client_Url}/signup?isRegistered=true`);
        }
        else {
            const obj = {
                image: user.photos[0].value,
                email: user === null || user === void 0 ? void 0 : user.emails[0].value,
                name: user.displayName,
            };
            res.redirect(`${config_1.Client_Url}/signup?user=` + encodeURIComponent(JSON.stringify(obj)));
        }
    }
});
exports.fbOAuthRouter = (0, express_1.Router)();
exports.fbOAuthRouter.route("/auth/login/facebook").get((req, res, next) => {
    passport_1.default.authenticate("facebook", {
        scope: ["profile", "email"],
        state: `login?location=${req.query.location}`,
    })(req, res, next);
});
exports.fbOAuthRouter.route("/auth/signup/google").get((req, res, next) => {
    passport_1.default.authenticate("facebook", {
        scope: ["profile", "email"],
        state: "signup",
    })(req, res, next);
});
exports.fbOAuthRouter
    .route("/auth/facebook/callback")
    .get((req, res, next) => {
    var _a;
    console.log("1");
    const { state } = req.query;
    const str = state === null || state === void 0 ? void 0 : state.split("?");
    const login = str[0];
    const location = (_a = str[1]) === null || _a === void 0 ? void 0 : _a.replace("location=", "");
    passport_1.default.authenticate("facebook", {
        successRedirect: `/auth/fb/success/${login}${login === "login" ? `?location=${location}` : ""}`,
        failureRedirect: `/auth/failure/${state}`,
    })(req, res, next);
});
exports.fbOAuthRouter.route("/auth/fb/success/login").get(fbSuccessLogin);
// fbOAuthRouter.route("/auth/failure/login").get(failLogin);
exports.fbOAuthRouter.route("/auth/success/signup").get(successSignup);
