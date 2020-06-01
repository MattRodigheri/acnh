import React from "react";
import "./App.css";
import Fish from "./Fish.js";

class App extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Fish />
      </div>
    );
  }
}

export default App;
