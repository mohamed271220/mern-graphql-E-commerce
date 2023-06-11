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
import { graphQLRoute, newRefToken } from "./assets/routes.js";

export const getnewAccess = async () => {
  const refToken = Cookies.get("refresh-token");
  const res = await axios.post(
    newRefToken,
    {
      refToken,
    },
    { withCredentials: true }
  );
  return res.data.accessToken;
};

const httpLink = new HttpLink({ uri: graphQLRoute });

const middleware: unknown = setContext(async (_, { headers }) => {
  const token = await getnewAccess();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  uri: graphQLRoute,
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
