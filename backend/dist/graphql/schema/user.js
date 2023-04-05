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
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const product_js_1 = require("./product.js");
const user_js_1 = require("../../mongoose/schema/user.js");
const hashPassword_js_1 = require("../../middlewares/hashPassword.js");
const userType = new graphql_1.GraphQLObjectType({
    name: "users",
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLInt },
        fav: { type: new graphql_1.GraphQLList(product_js_1.productType) },
        cart: { type: new graphql_1.GraphQLList(product_js_1.productType) },
    }),
});
const userMutation = new graphql_1.GraphQLObjectType({
    name: "userMutation",
    fields: () => ({
        addUser: {
            type: userType,
            args: {
                name: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                const check = yield user_js_1.userCollection.find({ email: args.email });
                if (check.length > 0) {
                    return { email: args.email, message: "this email has registered" };
                }
                else {
                    const res = yield user_js_1.userCollection.create(Object.assign(Object.assign({}, args), { password: (0, hashPassword_js_1.hashPassword)(args.password) }));
                    return res;
                }
            }),
        },
    }),
});
const userSchema = new graphql_1.GraphQLSchema({
    mutation: userMutation,
});
exports.default = userSchema;
