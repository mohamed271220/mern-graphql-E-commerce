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
const graphql_1 = require("graphql");
const user_js_1 = require("../../mongoose/schema/user.js");
const hashPassword_js_1 = require("../../middlewares/hashPassword.js");
const authenticate_js_1 = require("../../middlewares/authenticate.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../../config.js");
const product_js_1 = require("./product.js");
const product_js_2 = __importDefault(require("../../mongoose/schema/product.js"));
const messageType = new graphql_1.GraphQLObjectType({
    name: "message",
    fields: () => ({
        msg: { type: graphql_1.GraphQLString },
    }),
});
const cartType = new graphql_1.GraphQLObjectType({
    name: "carts",
    fields: () => ({
        productId: { type: graphql_1.GraphQLID },
        count: { type: graphql_1.GraphQLInt },
        msg: { type: graphql_1.GraphQLString },
    }),
});
const favtType = new graphql_1.GraphQLObjectType({
    name: "fav",
    fields: () => ({
        productId: { type: graphql_1.GraphQLID },
        msg: { type: graphql_1.GraphQLString },
    }),
});
const userType = new graphql_1.GraphQLObjectType({
    name: "users",
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        msg: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLInt },
        fav: { type: new graphql_1.GraphQLList(cartType) },
        cart: { type: new graphql_1.GraphQLList(cartType) },
        favArr: {
            type: new graphql_1.GraphQLList(product_js_1.productType),
            resolve(par, arg) {
                const arrOfIds = par.fav.map((e) => e.productId);
                console.log(arrOfIds);
                return product_js_2.default.find({ _id: { $in: arrOfIds } });
            },
        },
    }),
});
const userMutation = new graphql_1.GraphQLObjectType({
    name: "userMutation",
    fields: {
        addUser: {
            type: userType,
            args: {
                name: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
                msg: { type: graphql_1.GraphQLString },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                const check = yield user_js_1.userCollection.find({ email: args.email });
                if (check.length > 0) {
                    return { email: args.email, msg: "this email has registered" };
                }
                else {
                    const res = yield user_js_1.userCollection.create(Object.assign(Object.assign({}, args), { password: (0, hashPassword_js_1.hashPassword)(args.password) }));
                    return Object.assign(Object.assign({}, res), { msg: "user created successfully" });
                }
            }),
        },
        authenticate: {
            type: messageType,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve: (_, args, { res }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const result = yield (0, authenticate_js_1.authenticateMiddleware)(args.email, args.password);
                    console.log(result);
                    if (Array.isArray(result)) {
                        if (result.length > 0) {
                            const expire = { expiresIn: "100h" };
                            const accessToken = jsonwebtoken_1.default.sign({ result }, config_js_1.ACCESS_TOKEN_SECRET, expire);
                            const refToken = jsonwebtoken_1.default.sign({ result }, config_js_1.REFRESH_TOKEN_SECRET, expire);
                            const id = result[0]._id.toString();
                            console.log({ id });
                            res.cookie("user-email", result[0].email);
                            res.cookie("user-id", id);
                            res.cookie("access-token", accessToken);
                            res.cookie("refresh-token", refToken);
                            return { msg: "you successfully loggedIn" };
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
        },
        addToCart: {
            type: cartType,
            args: {
                userId: { type: graphql_1.GraphQLID },
                productId: { type: graphql_1.GraphQLID },
                count: { type: graphql_1.GraphQLInt },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const cart = { count: args.count, productId: args.productId };
                    const res = yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                        $push: { cart },
                    }, { new: true });
                    console.log(res);
                    return Object.assign(Object.assign({}, res), { msg: "successfully added to your cart" });
                }
                catch (err) {
                    return err.message;
                }
            }),
        },
        addToFav: {
            type: favtType,
            args: {
                productId: { type: graphql_1.GraphQLID },
                userId: { type: graphql_1.GraphQLID },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const obj = { productId: args.productId };
                    const res = yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                        $push: { fav: obj },
                    }, { new: true });
                    console.log(res);
                    return Object.assign(Object.assign({}, res), { msg: "successfully added to your favorites" });
                }
                catch (err) {
                    return err.message;
                }
            }),
        },
        removeFromFav: {
            type: messageType,
            args: {
                productId: { type: graphql_1.GraphQLID },
                userId: { type: graphql_1.GraphQLID },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const obj = { productId: args.productId };
                    yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                        $pull: { fav: obj },
                    }, { new: true });
                    return { msg: "removed from your favorites" };
                }
                catch (err) {
                    return err.message;
                }
            }),
        },
        getUserData: {
            type: userType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(par, args) {
                return user_js_1.userCollection.findById(args.id);
            },
        },
    },
});
const userSchema = new graphql_1.GraphQLSchema({
    mutation: userMutation,
});
console.log(cartType);
exports.default = userSchema;
