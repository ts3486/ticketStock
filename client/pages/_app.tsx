import App from "next/app";
import React from "react";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, ApolloLink, Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getAccessToken, setAccessToken } from "../components/Auth/accessTokens";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import Index from "../pages/index";
import AppStyles from "../styles/App.module.css";

const cache = new InMemoryCache({});

//Apollo
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path, locations }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      console.log(locations);
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

//auth
const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });

            console.log("header set");
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const tRLink = new TokenRefreshLink({
  accessTokenField: "accessToken",

  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      console.log("no token");
      return true;
    }

    try {
      const { exp }: any = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        console.log("user has access");
        return true;
      }
    } catch {
      return false;
    }
  },

  fetchAccessToken: () => {
    return fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },

  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
    console.log("handleFetch: " + accessToken);
  },

  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

const link = from([
  tRLink,
  errorLink,
  requestLink,
  new HttpLink({ uri: "http://localhost:5000/graphql", credentials: "include" }),
  //credentials: "include" important
]);

export const client = new ApolloClient({
  cache: new InMemoryCache({}),
  credentials: "include",
  link: link,
});

export default class TicketStock extends App {
  componentDidMount() {}

  render() {
    // const { Component, pageProps }: AppProps = this.props;

    return (
      <ApolloProvider client={client}>
        <Index />
      </ApolloProvider>
    );
  }
}
