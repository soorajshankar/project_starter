import React from "react";
import ReactDOM from "react-dom";

import "./styles/tailwind.generated.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import ENDPOINTS from "./Endpoints";

const wsLink = new WebSocketLink({
  uri: ENDPOINTS.GQL_WS_URL,
  options: {
    reconnect: true,
  },
});
console.log(ENDPOINTS);
const httpLink = new HttpLink({
  uri: ENDPOINTS.GQL_URL,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("content")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
