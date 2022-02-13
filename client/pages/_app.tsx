import App from "next/app";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo";
import drizzleOptions from "../drizzleOptions";
import { AppProps } from "next/dist/shared/lib/router/router";
import { setAccessToken } from "../accessTokens";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import NavBar from "../components/General/NavBar";
import Footer from "../components/General/Footer";
import "../styles/globals.css";

//Drizzle
const { DrizzleContext } = require("@drizzle/react-plugin");
const { Drizzle } = require("@drizzle/store");

const drizzle = new Drizzle(drizzleOptions);

//App
export default class TicketStock extends App {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount = () => {
    console.log("refresh request");
    // token authentication
    fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      console.log(accessToken);
      setAccessToken(accessToken);
      this.setState({ loading: false });
    });
  };

  render() {
    const { Component, pageProps }: AppProps = this.props;

    return (
      <ApolloProvider client={client}>
        <DrizzleContext.Provider drizzle={drizzle}>
          <DrizzleContext.Consumer>
            {(drizzleContext: any) => {
              const { drizzle, drizzleState, initialized } = drizzleContext;

              if (!initialized) {
                //Improve error ui
                console.log("initializing...");
                return "Loading...";
              }

              {
                console.log("initialized");
                return (
                  <div className="App">
                    <ThemeProvider theme={theme}>
                      <NavBar />
                      <Component {...pageProps} drizzle={drizzle} drizzleState={drizzleState} />
                      <Footer />
                    </ThemeProvider>
                  </div>
                );
              }
            }}
          </DrizzleContext.Consumer>
        </DrizzleContext.Provider>
      </ApolloProvider>
    );
  }
}

//Router Option:
// <Router>
//   <NavBar />
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="/profile" element={<MyPage />} />
//     <Route path="/add" element={<Add />} />
//   </Routes>
// </Router>;
