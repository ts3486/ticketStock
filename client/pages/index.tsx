import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAccessToken, setAccessToken } from "../components/Auth/accessTokens";
import drizzleOptions from "../drizzleOptions";
import NavBar from "../components/Navbar";
import Home from "../pages/home";
import Add from "../pages/add";
import Login from "../pages/login";
import Register from "../pages/register";
import MyPage from "./profile";

//Drizzle
const { DrizzleContext } = require("@drizzle/react-plugin");
const { Drizzle } = require("@drizzle/store");

const drizzle = new Drizzle(drizzleOptions);

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("refresh request");
    // token authentication
    fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext: any) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            //Improve error ui
            return "Loading...";
          }

          {
            return (
              <Router>
                <NavBar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<MyPage drizzle={drizzle} drizzleState={drizzleState} />} />
                  <Route path="/add" element={<Add drizzle={drizzle} drizzleState={drizzleState} />} />
                </Routes>
              </Router>
            );
          }
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
};

export default Index;
