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
const config_1 = require("../src/config");
const failed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});
const success = (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            //   cookies: req.cookies
        });
    }
};
exports.oAuthRouter = (0, express_1.Router)();
exports.oAuthRouter
    .route("/auth/google")
    .get(passport_1.default.authenticate("google", { scope: ["profile"] }));
exports.oAuthRouter.route("/auth/google/callback").get(passport_1.default.authenticate("google", {
    successRedirect: config_1.Client_Url,
    failureRedirect: "/auth/login/failed",
}));
exports.oAuthRouter.route("/auth/login/failed").get(failed);
exports.oAuthRouter.route("/auth/login/success").get(success);
