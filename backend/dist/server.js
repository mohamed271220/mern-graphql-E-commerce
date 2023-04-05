"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const express_graphql_1 = require("express-graphql");
const product_js_1 = __importDefault(require("./graphql/schema/product.js"));
const user_1 = __importDefault(require("./graphql/schema/user"));
const schema_1 = require("@graphql-tools/schema");
mongoose_1.default.connect(config_1.MongoDB_URL);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173",
}));
app.use(express_1.default.json());
const schema = (0, schema_1.mergeSchemas)({
    schemas: [product_js_1.default, user_1.default],
});
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    graphiql: true,
    schema,
}));
app.listen(3000, () => {
    console.log("server-runs");
});
