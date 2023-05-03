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
exports.oAuthRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const config_1 = require("../config");
const user_1 = require("../mongoose/schema/user");
const success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = req.user;
    console.log(req.user);
    const email = (_a = user === null || user === void 0 ? void 0 : user.emails[0]) === null || _a === void 0 ? void 0 : _a.value;
    if (email) {
        const result = yield user_1.userCollection.findOne({ email });
        if (result) {
            res.redirect(`${config_1.Client_Url}`);
        }
        else {
            const obj = {
                image: user.photos[0].value,
                email: user === null || user === void 0 ? void 0 : user.emails[0].value,
                name: user.displayName,
            };
            console.log(obj);
            res.redirect(`${config_1.Client_Url}/signup?user=` + encodeURIComponent(JSON.stringify(obj)));
        }
    }
});
const failure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    //   res.redirect(
    //     `${Client_Url}/signup?user=` + encodeURIComponent(JSON.stringify(profile))
    //   );
});
exports.oAuthRouter = (0, express_1.Router)();
exports.oAuthRouter
    .route("/auth/google")
    .get(passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
exports.oAuthRouter.route("/auth/google/callback").get(passport_1.default.authenticate("google", {
    successRedirect: `/auth/success`,
    failureRedirect: "/auth/failure",
}));
exports.oAuthRouter.route("/auth/success").get(success);
exports.oAuthRouter.route("/auth/failed").get(failure);
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
