"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeRoute = exports.getStripePublicKeyRoute = void 0;
const getStripePublicKeyRoute = () => "http://localhost:3000/getkey/stripe";
exports.getStripePublicKeyRoute = getStripePublicKeyRoute;
const StripeRoute = () => "http://localhost:3000/stripe";
exports.StripeRoute = StripeRoute;
