"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@graphql-tools/schema");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_js_1 = require("./config.js");
const express_graphql_1 = require("express-graphql");
const user_js_1 = require("./graphql/schema/user.js");
const product_js_1 = require("./graphql/schema/product.js");
const uploudRoute_js_1 = require("./Upload/uploudRoute.js");
const stripe_js_1 = __importDefault(require("./stripe/stripe.js"));
const passport_1 = __importDefault(require("passport"));
require("./oAuth/google.js");
require("./oAuth/fb.js");
const googleAuth_js_1 = require("./routes/googleAuth.js");
const fbRoutes_js_1 = require("./routes/fbRoutes.js");
const cookieSession = require("cookie-session");
mongoose_1.default.connect(config_js_1.MongoDB_URL);
const app = (0, express_1.default)();
app.use(cookieSession({
    name: "session",
    keys: [config_js_1.SeSSion_Secret],
    maxAge: 24 * 60 * 60 * 100,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173",
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const schema = (0, schema_1.mergeSchemas)({
    schemas: [product_js_1.graphQlSchema, user_js_1.userSchema],
});
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    graphiql: true,
    schema,
}));
app.use("/", uploudRoute_js_1.uploadRoute);
app.use("/", stripe_js_1.default);
app.use("/", googleAuth_js_1.oAuthRouter);
app.use("/", fbRoutes_js_1.fbOAuthRouter);
app.listen(3000, () => {
    console.log("server-runs");
});
