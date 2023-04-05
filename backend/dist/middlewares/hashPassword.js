"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const hashPassword = (pass) => {
    return bcrypt_1.default.hashSync((pass + config_1.BCRYPT_SECRET), Number(config_1.BCRYPT_SALT_ROUNDS));
};
exports.hashPassword = hashPassword;
