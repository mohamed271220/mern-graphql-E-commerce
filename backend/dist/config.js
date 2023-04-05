"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCRYPT_SALT_ROUNDS = exports.BCRYPT_SECRET = exports.MongoDB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MongoDB_URL, BCRYPT_SECRET, BCRYPT_SALT_ROUNDS, } = process.env;
exports.MongoDB_URL = MongoDB_URL;
exports.BCRYPT_SECRET = BCRYPT_SECRET;
exports.BCRYPT_SALT_ROUNDS = BCRYPT_SALT_ROUNDS;
