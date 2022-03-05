import App from "next/app";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Provider as StoreProvider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import authReducer from "../store/reducers/authReducer";
import { client } from "../apollo";
import getWeb3 from "../functions/web3/getWeb3";
import { AppProps } from "next/dist/shared/lib/router/router";
import { setAccessToken } from "../accessTokens";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import NavBar from "../components/General/NavBar";
import Footer from "../components/General/Footer";
import "../styles/globals.css";

//Redux
const rootReducer = combineReducers({
  auth: authReducer,
});

//Process represents the global state of the app. (process.env represents the current enviornment)
const devTools =
  process.env.NODE_ENV === "production" ? applyMiddleware(thunk) : composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, devTools);

//App
export default class TicketStock extends App {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      loggedin: false,
      wallet: "",
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
      this.setState({ loading: false, loggedin: true });
    });
  };

  render() {
    const { Component, pageProps }: AppProps = this.props;

    return (
      <ApolloProvider client={client}>
        <StoreProvider store={store}>
          <div className="App">
            <ThemeProvider theme={theme}>
              <NavBar />
              <Component {...pageProps} />
              <Footer />
            </ThemeProvider>
          </div>
        </StoreProvider>
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
