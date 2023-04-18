import { mergeSchemas } from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";
import { GraphQLObjectType } from "graphql";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { MongoDB_URL } from "./config";
import { graphqlHTTP } from "express-graphql";
import { userMutation, userSchema } from "./graphql/schema/user.js";
import { graphQlSchema } from "./graphql/schema/product.js";
mongoose.connect(MongoDB_URL as unknown as string);
const app = express();
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

app.listen(3000, () => {
  console.log("server-runs");
});
