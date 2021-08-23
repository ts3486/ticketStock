import React, { Component } from "react";
import NavBar from "./components/navComponent";
import MyComponent from "./MyComponent";
import drizzleOptions from "./drizzleOptions";
import "./App.css";
const { DrizzleContext } = require("@drizzle/react-plugin");
const { Drizzle } = require("@drizzle/store");

const drizzle = new Drizzle(drizzleOptions);

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <NavBar></NavBar>
        <DrizzleContext.Consumer>
          {(drizzleContext: any) => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Loading...";
            }

            return (
              <MyComponent drizzle={drizzle} drizzleState={drizzleState} />
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    );
  }
}

export default App;
