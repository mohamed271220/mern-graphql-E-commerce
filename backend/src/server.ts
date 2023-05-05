import { mergeSchemas } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";
import { GraphQLObjectType } from "graphql";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { MongoDB_URL, SeSSion_Secret } from "./config.js";
import { graphqlHTTP } from "express-graphql";
import { userMutation, userSchema } from "./graphql/schema/user.js";
import { graphQlSchema } from "./graphql/schema/product.js";
import { uploadRoute } from "./Upload/uploudRoute.js";
import stripeRoutes from "./stripe/stripe.js";
import passport from "passport";
import "./oAuth/google.js";
import "./oAuth/fb.js";
import { oAuthRouter } from "./routes/googleAuth.js";
import { fbOAuthRouter } from "./routes/fbRoutes.js";
import cookieSession = require("cookie-session");
mongoose.connect(MongoDB_URL as unknown as string);

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [SeSSion_Secret as unknown as string],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());
const schema = mergeSchemas({
  schemas: [graphQlSchema, userSchema],
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.use("/", uploadRoute);
app.use("/", stripeRoutes);
app.use("/", fbOAuthRouter);
app.use("/", oAuthRouter);

app.listen(3000, () => {
  console.log("server-runs");
});
