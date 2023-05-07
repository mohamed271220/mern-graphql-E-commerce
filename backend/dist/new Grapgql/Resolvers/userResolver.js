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
exports.userResolver = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../../config.js");
const authenticate_js_1 = require("../../middlewares/authenticate.js");
const hashPassword_js_1 = require("../../middlewares/hashPassword.js");
const user_js_1 = require("../../mongoose/schema/user.js");
exports.userResolver = {
    Mutation: {
        addUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const check = yield user_js_1.userCollection.find({ email: input.email });
            if (check.length > 0) {
                return {
                    status: 401,
                    email: input.email,
                    msg: "this email has registered",
                };
            }
            else {
                console.log(input);
                const res = yield user_js_1.userCollection.create(Object.assign(Object.assign({}, input), { image: input.image ||
                        "https://res.cloudinary.com/domobky11/image/upload/v1682383659/download_d2onbx.png", password: (0, hashPassword_js_1.hashPassword)(input.password) }));
                return Object.assign(Object.assign({}, res), { status: 200, msg: "user created successfully" });
            }
        }),
        authenticate: (_, args, { res }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield (0, authenticate_js_1.authenticateMiddleware)(args.email, args.password);
                if (Array.isArray(result)) {
                    if (result.length > 0) {
                        const expire = { expiresIn: "15s" };
                        const accessToken = jsonwebtoken_1.default.sign({ result }, config_js_1.ACCESS_TOKEN_SECRET, expire);
                        const refToken = jsonwebtoken_1.default.sign({ result }, config_js_1.REFRESH_TOKEN_SECRET);
                        const id = result[0]._id.toString();
                        console.log({ id });
                        res.cookie("user-email", result[0].email);
                        res.cookie("user-id", id);
                        res.cookie("access-token", accessToken);
                        res.cookie("refresh-token", refToken);
                        return { msg: "you successfully logged in" };
                    }
                }
                else if (!result) {
                    return { msg: "password is wrong" };
                }
                else {
                    return { msg: result };
                }
            }
            catch (err) {
                return err.message;
            }
        }),
        getUserData(par, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield user_js_1.userCollection.findById(args.id);
            });
        },
        addToCart: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $push: { cart: input },
                }, { new: true });
                console.log(res);
                return Object.assign(Object.assign({}, res), { msg: "successfully added to your cart" });
            }
            catch (err) {
                return err.message;
            }
        }),
        removeFromCart: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $pull: { cart: { productId: { $in: input.productId } } },
                }, { new: true });
                return { msg: "removed from your cart" };
            }
            catch (err) {
                return err.message;
            }
        }),
        changeCartCount: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield user_js_1.userCollection.findOneAndUpdate({
                    _id: input.userId,
                    "cart.productId": input.productId,
                }, {
                    $set: { "cart.$.count": input.count },
                }, { new: true });
                return { msg: "count successfully changed" };
            }
            catch (err) {
                return err.message;
            }
        }),
        addToCompare(_, { input }) {
            return __awaiter(this, void 0, void 0, function* () {
                const { productId, title } = input;
                const res = yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $push: { compare: { productId, title } },
                }, { new: true });
                const newCompared = res.compare[res.compare.length - 1];
                newCompared.msg = "successfully added to your comparelist";
                return newCompared;
            });
        },
        removeFromCompare(_, { input }) {
            return __awaiter(this, void 0, void 0, function* () {
                const { productId } = input;
                const res = yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $pull: { compare: { productId } },
                }, { new: true });
                return { msg: "successfully removed from your comparelist" };
            });
        },
        addToFav: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $push: { fav: input },
                }, { new: true });
                return Object.assign(Object.assign({}, res), { msg: "successfully added to your favorites" });
            }
            catch (err) {
                return err.message;
            }
        }),
        removeFromFav: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield user_js_1.userCollection.findByIdAndUpdate(input.userId, {
                    $pull: { fav: { productId: { $in: input.productId } } },
                }, { new: true });
                return { msg: "removed from your favorites" };
            }
            catch (err) {
                return err.message;
            }
        }),
    },
};
