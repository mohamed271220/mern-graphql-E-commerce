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
const types_js_1 = require("../types.js");
const order_js_1 = require("./order.js");
const order_js_2 = require("../../mongoose/schema/order.js");
const date_js_1 = require("./types/date.js");
const messageType = new graphql_1.GraphQLObjectType({
    name: "message",
    fields: () => ({
        msg: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLInt },
    }),
});
const cartType = new graphql_1.GraphQLObjectType({
    name: "carts",
    fields: () => ({
        productId: { type: graphql_1.GraphQLID },
        parentId: { type: graphql_1.GraphQLID },
        count: { type: graphql_1.GraphQLInt },
        _id: { type: graphql_1.GraphQLID },
        path: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLFloat },
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
const compareType = new graphql_1.GraphQLObjectType({
    name: "compare",
    fields: () => ({
        productId: { type: graphql_1.GraphQLID },
        _id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        msg: { type: graphql_1.GraphQLString },
        state: { type: graphql_1.GraphQLString },
    }),
});
const userType = new graphql_1.GraphQLObjectType({
    name: "users",
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        msg: { type: graphql_1.GraphQLString },
        country: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLInt },
        fav: { type: new graphql_1.GraphQLList(favtType) },
        cart: { type: new graphql_1.GraphQLList(cartType) },
        compare: { type: new graphql_1.GraphQLList(compareType) },
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
                country: { type: graphql_1.GraphQLString },
                image: { type: graphql_1.GraphQLString },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                const check = yield user_js_1.userCollection.find({ email: args.email });
                if (check.length > 0) {
                    return {
                        status: 401,
                        email: args.email,
                        msg: "this email has registered",
                    };
                }
                else {
                    console.log(args);
                    const res = yield user_js_1.userCollection.create(Object.assign(Object.assign({}, args), { image: args.image ||
                            "https://res.cloudinary.com/domobky11/image/upload/v1682383659/download_d2onbx.png", password: (0, hashPassword_js_1.hashPassword)(args.password) }));
                    return Object.assign(Object.assign({}, res), { status: 200, msg: "user created successfully" });
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
        },
        updateUserName: {
            type: messageType,
            args: { name: { type: graphql_1.GraphQLString }, _id: { type: graphql_1.GraphQLID } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield user_js_1.userCollection.findByIdAndUpdate(args._id, { name: args.name });
                    return { status: 200, msg: "username is successfully updated  " };
                });
            },
        },
        updateUserCountry: {
            type: messageType,
            args: { country: { type: graphql_1.GraphQLString }, _id: { type: graphql_1.GraphQLID } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield user_js_1.userCollection.findByIdAndUpdate(args._id, {
                        country: args.country,
                    });
                    return { status: 200, msg: "your country  is successfully updated  " };
                });
            },
        },
        updateUserPhone: {
            type: userType,
            args: { phone: { type: graphql_1.GraphQLString }, _id: { type: graphql_1.GraphQLID } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield user_js_1.userCollection.findByIdAndUpdate(args._id, { phone: args.phone });
                });
            },
        },
        checkOldPassword: {
            type: messageType,
            args: { _id: { type: graphql_1.GraphQLID }, password: { type: graphql_1.GraphQLString } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield (0, authenticate_js_1.checkOldPass)(args._id, args.password);
                    return { msg: result, status: 200 };
                });
            },
        },
        updatePassword: {
            type: userType,
            args: { password: { type: graphql_1.GraphQLString }, _id: { type: graphql_1.GraphQLID } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield user_js_1.userCollection.findByIdAndUpdate(args._id, {
                        password: (0, hashPassword_js_1.hashPassword)(args.password),
                    });
                    return { msg: "your password successfully updated", status: 200 };
                });
            },
        },
        updateEmail: {
            type: userType,
            args: { email: { type: graphql_1.GraphQLString }, _id: { type: graphql_1.GraphQLID } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const check = yield user_js_1.userCollection.find({ email: args.email });
                    if (check.length) {
                        return { msg: "this email already used" };
                    }
                    else {
                        yield user_js_1.userCollection.findByIdAndUpdate(args._id, {
                            email: args.email,
                        });
                        return { msg: "your email is updated successfully" };
                    }
                });
            },
        },
        addToCart: {
            type: cartType,
            args: {
                userId: { type: graphql_1.GraphQLID },
                productId: { type: graphql_1.GraphQLID },
                parentId: { type: graphql_1.GraphQLID },
                count: { type: graphql_1.GraphQLInt },
                title: { type: graphql_1.GraphQLString },
                path: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLFloat },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const res = yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                        $push: { cart: args },
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
                price: { type: graphql_1.GraphQLFloat },
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
        addToCompare: {
            type: compareType,
            args: {
                userId: { type: graphql_1.GraphQLID },
                productId: { type: graphql_1.GraphQLID },
                title: { type: graphql_1.GraphQLString },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { productId, title } = args;
                    const res = yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                        $push: { compare: { productId, title } },
                    }, { new: true });
                    const newCompared = res.compare[res.compare.length - 1];
                    newCompared.msg = "successfully added to your comparelist";
                    return newCompared;
                });
            },
        },
        removeFromCompare: {
            type: compareType,
            args: {
                userId: { type: graphql_1.GraphQLID },
                productId: { type: graphql_1.GraphQLID },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { productId } = args;
                    const res = yield user_js_1.userCollection.findByIdAndUpdate(args.userId, {
                        $pull: { compare: { productId } },
                    }, { new: true });
                    return { msg: "successfully removed from your comparelist" };
                });
            },
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
        filterByDate: {
            type: new graphql_1.GraphQLList(product_js_1.productType),
            args: { date: { type: graphql_1.GraphQLInt } },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (args.date === 1) {
                        return product_js_2.default.find({}).sort({ createdAt: 1 });
                    }
                    else if (args.date === -1) {
                        return product_js_2.default.find({}).sort({ createdAt: -1 });
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
                                    rateAvg: { $avg: "$rating" },
                                    avgReviewRating: { $avg: "$reviews.rate" },
                                },
                            },
                            {
                                $addFields: {
                                    overallAvg: {
                                        $divide: [{ $add: ["$rateAvg", "$avgReviewRating"] }, 2],
                                    },
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
        addReview: {
            type: types_js_1.ReviewType,
            args: {
                userId: { type: graphql_1.GraphQLID },
                _id: { type: graphql_1.GraphQLID },
                rate: { type: graphql_1.GraphQLInt },
                review: { type: graphql_1.GraphQLString },
                image: { type: graphql_1.GraphQLString },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const { userId, rate, review, image } = args;
                        const data = yield product_js_2.default.findByIdAndUpdate(args._id, {
                            $push: { reviews: { userId, rate, review, image } },
                        }, { new: true });
                        const addedReview = data.reviews[data.reviews.length - 1];
                        addedReview.msg = "review added";
                        addedReview.status = 200;
                        return addedReview;
                    }
                    catch (err) {
                        return err.message;
                    }
                });
            },
        },
        updateReview: {
            type: types_js_1.ReviewType,
            args: {
                _id: { type: graphql_1.GraphQLID },
                productId: { type: graphql_1.GraphQLID },
                rate: { type: graphql_1.GraphQLInt },
                review: { type: graphql_1.GraphQLString },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const { rate, review } = args;
                        return yield product_js_2.default.findOneAndUpdate({
                            _id: args.productId,
                            "reviews._id": args._id,
                        }, {
                            $set: {
                                "reviews.$.rate": args.rate,
                            },
                        });
                    }
                    catch (err) {
                        return err.message;
                    }
                });
            },
        },
        deleteReview: {
            type: types_js_1.ReviewType,
            args: {
                _id: { type: graphql_1.GraphQLID },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield product_js_2.default.findOneAndDelete({
                            "reviews._id": args._id,
                        });
                    }
                    catch (err) {
                        return err.message;
                    }
                });
            },
        },
        updateProduct: {
            type: messageType,
            args: {
                title: { type: graphql_1.GraphQLString },
                state: { type: graphql_1.GraphQLString },
                _id: { type: graphql_1.GraphQLID },
                stock: { type: graphql_1.GraphQLInt },
                price: { type: graphql_1.GraphQLFloat },
                description: { type: graphql_1.GraphQLString },
                category: { type: graphql_1.GraphQLString },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(args);
                    yield product_js_2.default.findByIdAndUpdate(args._id, args);
                    return { msg: "product updated successfully", status: 200 };
                });
            },
        },
        addProduct: {
            type: product_js_1.productType,
            args: {
                title: { type: graphql_1.GraphQLString },
                state: { type: graphql_1.GraphQLString },
                stock: { type: graphql_1.GraphQLInt },
                price: { type: graphql_1.GraphQLInt },
                description: { type: graphql_1.GraphQLString },
                category: { type: graphql_1.GraphQLString },
                createdAt: { type: date_js_1.DateType },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(args);
                    return product_js_2.default.create(Object.assign(Object.assign({}, args), { deliveredAt: null }));
                });
            },
        },
        //order
        // addOrder: {
        //   type: orderType,
        //   args: {
        //     userId: { type: GraphQLID },
        //     state: { type: GraphQLString },
        //     productId: { type: new GraphQLList(orderProduct) },
        //     count: { type: GraphQLInt },
        //     cost: { type: GraphQLFloat },
        //     createdAt: { type: DateType },
        //   },
        //   async resolve(_, args) {
        //     try {
        //       return await OrderCollection.create(args);
        //     } catch (err) {
        //       console.log(err);
        //     }
        //     // return { res, msg: "order is submitted" };
        //   },
        // },
        deleteOrder: {
            type: order_js_1.orderType,
            args: {
                _id: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const length = args._id.length;
                    yield order_js_2.OrderCollection.deleteMany({ _id: { $in: args._id } });
                    return {
                        msg: `${length} ${length >= 2 ? "orders" : "order"} ${length >= 2 ? "are" : "is"} successfully deleted`,
                    };
                });
            },
        },
        updateOrder: {
            type: order_js_1.orderType,
            args: {
                _id: { type: graphql_1.GraphQLID },
                state: { type: graphql_1.GraphQLString },
                deliveredAt: { type: date_js_1.DateType },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(args);
                    const res = yield order_js_2.OrderCollection.findByIdAndUpdate(args._id, {
                        state: args.state,
                        deliveredAt: args.deliveredAt,
                    });
                    return { msg: "order is successfully updated" };
                });
            },
        },
    },
});
exports.userSchema = new graphql_1.GraphQLSchema({
    mutation: exports.userMutation,
});
