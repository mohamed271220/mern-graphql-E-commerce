import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MongoDB_URL } from "./config";
import { graphqlHTTP } from "express-graphql";
import graphQlSchema from "./graphql/schema/product.js";

mongoose.connect(MongoDB_URL as unknown as string);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: graphQlSchema,
  })
);

app.listen(3000, () => {
  console.log("server-runs");
});
