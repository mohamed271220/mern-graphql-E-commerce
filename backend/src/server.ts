import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { MongoDB_URL, SeSSion_Secret } from "./config.js";
import { uploadRoute } from "./Upload/uploudRoute.js";
import stripeRoutes from "./stripe/stripe.js";
import passport from "passport";
import "./oAuth/google.js";
import { oAuthRouter } from "./routes/googleAuth.js";
import cookieSession = require("cookie-session");
import { ApolloServer } from "apollo-server-express";
import { productTypeDefs } from "./new Grapgql/typeDefs/ProductDefTypes.js";
import { productResolver } from "./new Grapgql/Resolvers/productResolver.js";
import { orderDefType } from "./new Grapgql/typeDefs/orderType.js";
import { orderResolver } from "./new Grapgql/Resolvers/orderResolver.js";
import { userTypeDefs } from "./new Grapgql/typeDefs/userTypeDefs.js";
import { userResolver } from "./new Grapgql/Resolvers/userResolver.js";
import { applyMiddleware } from "graphql-middleware";
import { AuthRouter } from "./routes/tokensRoutes.js";
import { permissions } from "./new Grapgql/shield/permissions.js";
const { makeExecutableSchema } = require("@graphql-tools/schema");

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
app.use(cookieParser());
app.use(passport.session());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const schema = makeExecutableSchema({
  typeDefs: [productTypeDefs, orderDefType, userTypeDefs],
  resolvers: [productResolver, orderResolver, userResolver],
});

const schemaWithPermissions = applyMiddleware(schema, permissions);

app.use(express.json());
// server.applyMiddleware({ app });

const server = new ApolloServer({
  schema: schemaWithPermissions,
  context: ({ req, res }) => {
    return { req, res };
  },
});

//old graphql
// const schema = mergeSchemas({
//   schemas: [graphQlSchema, userSchema],
// });

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     graphiql: true,
//     schema,
//   })
// );

app.use("/", uploadRoute);
app.use("/", stripeRoutes);

app.use("/", oAuthRouter);
app.use("/token", AuthRouter);

(async () => {
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:5173",
    },
  });
  app.listen({ port: 3000 }, () => {
    console.log("server-runs");
  });
})();
