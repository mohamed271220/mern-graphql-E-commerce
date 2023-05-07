import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
  execute,
  from,
} from "@apollo/client";

import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { setContext } from "apollo-link-context";

const getnewAccess = async () => {
  const refToken = Cookies.get("refresh-token");

  const res = await axios.post(
    "http://localhost:3000/token/auth/newRefToken",
    {
      refToken,
    },
    { withCredentials: true }
  );
  console.log(res.data.accessToken);
  return res.data.accessToken;
};

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  const accessToken = (async () => {
    return await getnewAccess();
  })();
  console.log(accessToken);
  operation.setContext(async ({ headers = {} }) => {
    const token = await getnewAccess();
    console.log(headers);
    console.log(token);
    return () => ({
      headers: {
        ...headers,
        authorization: `${"token"}` || null,
      },
    });
  });

  return forward(operation);
});

const middleware: any = setContext(async (_, { headers }) => {
  const token = await getnewAccess();
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  // link: concat(authMiddleware, httpLink),
  link: from([middleware, httpLink]),

  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
