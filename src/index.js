import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";


import { AuthProvider } from "./pages/auth";
import { AUTH_TOKEN } from "./common/constant";

const httpLink = createHttpLink({
  uri: "https://tmdb-server-dev.logicwind.co/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <AuthProvider>
  <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </AuthProvider>
  
  </BrowserRouter>
);

reportWebVitals();



