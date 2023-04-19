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
exports.userSchema = exports.userMutation = void 0;
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
        _id: { type: graphql_1.GraphQLID },
        path: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
        title: { type: graphql_1.GraphQLString },
        msg: { type: graphql_1.GraphQLString },
    }),
});
const favtType = new graphql_1.GraphQLObjectType({
    name: "fav",
    fields: () => ({
        productId: { type: graphql_1.GraphQLID },
        parentId: { type: graphql_1.GraphQLID },
        _id: { type: graphql_1.GraphQLID },
        path: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
        title: { type: graphql_1.GraphQLString },
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
        fav: { type: new graphql_1.GraphQLList(favtType) },
        cart: { type: new graphql_1.GraphQLList(cartType) },
        // favArr: {
        //   type: new GraphQLList(productType),
        //   resolve(par, arg) {
        //     const arrOfIds = par.fav.map((e: any) => e.productId);
        //     console.log(arrOfIds);
        //     return productCollection.find(
        //       { "images._id": { $in: arrOfIds } },
        //       { "images.$": 1, price: 1, title: 1 }
        //     );
        //   },
        // },
    }),
});
exports.userMutation = new graphql_1.GraphQLObjectType({
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
                title: { type: graphql_1.GraphQLString },
                path: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLInt },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const { price, title, path, count, productId } = args;
                    const res = yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                        $push: { cart: { price, title, path, count, productId } },
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
                parentId: { type: graphql_1.GraphQLID },
                title: { type: graphql_1.GraphQLString },
                path: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLInt },
                userId: { type: graphql_1.GraphQLID },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const res = yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                        $push: { fav: args },
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
                productId: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
                userId: { type: graphql_1.GraphQLID },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                        $pull: { fav: { productId: { $in: args.productId } } },
                    }, { new: true });
                    return { msg: "removed from your favorites" };
                }
                catch (err) {
                    return err.message;
                }
            }),
        },
        removeFromCart: {
            type: messageType,
            args: {
                productId: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
                userId: { type: graphql_1.GraphQLID },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                        $pull: { cart: { productId: { $in: args.productId } } },
                    }, { new: true });
                    return { msg: "removed from your cart" };
                }
                catch (err) {
                    return err.message;
                }
            }),
        },
        changeCartCount: {
            type: messageType,
            args: {
                productId: { type: graphql_1.GraphQLID },
                userId: { type: graphql_1.GraphQLID },
                count: { type: graphql_1.GraphQLInt },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield user_js_1.userCollection.findOneAndUpdate({
                        _id: args.userId,
                        "cart.productId": args.productId,
                    }, {
                        $set: { "cart.$.count": args.count },
                    }, { new: true });
                    return { msg: "count successfully changed" };
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
        //products
        filterByPrice: {
            type: new graphql_1.GraphQLList(product_js_1.productType),
            args: { price: { type: graphql_1.GraphQLInt } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(args);
                    if (args.price === 1) {
                        return product_js_2.default.find({}).sort({ price: 1 });
                    }
                    else if (args.price === -1) {
                        return product_js_2.default.find({}).sort({ price: -1 });
                    }
                    else {
                        return product_js_2.default.find({ price: { $lte: args.price } });
                    }
                });
            },
        },
        filterByRate: {
            type: new graphql_1.GraphQLList(product_js_1.productType),
            args: { rate: { type: graphql_1.GraphQLInt } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (args.rate === 1) {
                        return yield product_js_2.default.aggregate([
                            {
                                $project: {
                                    _id: 1,
                                    title: 1,
                                    description: 1,
                                    price: 1,
                                    stock: 1,
                                    category: 1,
                                    state: 1,
                                    images: 1,
                                    rating: 1,
                                    reviews: 1,
                                    avgRate: { $avg: "$rating" },
                                },
                            },
                            { $sort: { avgRate: 1 } },
                        ]);
                    }
                    else if (args.rate === -1) {
                        return yield product_js_2.default.aggregate([
                            {
                                $project: {
                                    _id: 1,
                                    title: 1,
                                    description: 1,
                                    price: 1,
                                    stock: 1,
                                    category: 1,
                                    state: 1,
                                    images: 1,
                                    rating: 1,
                                    reviews: 1,
                                    avgRate: { $avg: "$rating" },
                                },
                            },
                            { $sort: { avgRate: -1 } },
                        ]);
                    }
                    else {
                        return yield product_js_2.default.aggregate([
                            {
                                $project: {
                                    _id: 1,
                                    title: 1,
                                    description: 1,
                                    price: 1,
                                    stock: 1,
                                    category: 1,
                                    state: 1,
                                    images: 1,
                                    rating: 1,
                                    reviews: 1,
                                    avgRate: { $avg: "$rating" },
                                },
                            },
                            { $match: { avgRate: { $lte: args.rate } } },
                        ]);
                    }
                });
            },
        },
        filterBycatageory: {
            type: new graphql_1.GraphQLList(product_js_1.productType),
            args: { category: { type: graphql_1.GraphQLString } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return product_js_2.default.find({ category: args.category });
                });
            },
        },
        filterByState: {
            type: new graphql_1.GraphQLList(product_js_1.productType),
            args: { state: { type: graphql_1.GraphQLString } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return product_js_2.default.find({ state: args.state });
                });
            },
        },
        filterAllTypes: {
            type: new graphql_1.GraphQLList(product_js_1.productType),
            args: {
                state: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                category: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                price: { type: graphql_1.GraphQLInt },
                rate: { type: graphql_1.GraphQLInt },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        console.log(args);
                        return yield product_js_2.default.aggregate([
                            {
                                $project: {
                                    _id: 1,
                                    title: 1,
                                    description: 1,
                                    price: 1,
                                    stock: 1,
                                    category: 1,
                                    state: 1,
                                    images: 1,
                                    rating: 1,
                                    reviews: 1,
                                    avgRate: { $avg: "$rating" },
                                },
                            },
                            {
                                $match: {
                                    avgRate: { $lte: args.rate },
                                    price: { $lte: args.price },
                                    category: { $in: args.category },
                                    state: { $in: args.state },
                                },
                            },
                        ]);
                    }
                    catch (err) {
                        console.log(err.message);
                    }
                });
            },
        },
        searchProducts: {
            type: new graphql_1.GraphQLList(product_js_1.productType),
            args: { word: { type: graphql_1.GraphQLString } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(args);
                    return yield product_js_2.default.find({
                        $or: [
                            { category: { $regex: args.word, $options: "i" } },
                            { title: { $regex: args.word, $options: "i" } },
                        ],
                    });
                });
            },
        },
    },
});
exports.userSchema = new graphql_1.GraphQLSchema({
    mutation: exports.userMutation,
});
