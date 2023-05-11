import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
  ApolloLink,
  RequestHandler,
} from "@apollo/client";

import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { setContext } from "apollo-link-context";

export const getnewAccess = async () => {
  const refToken = Cookies.get("refresh-token");

  const res = await axios.post(
    "http://localhost:3000/token/auth/newRefToken",
    {
      refToken,
    },
    { withCredentials: true }
  );
  return res.data.accessToken;
};

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const middleware: unknown = setContext(async (_, { headers }) => {
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
  link: from([middleware as ApolloLink, httpLink]),

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
