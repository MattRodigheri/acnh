import React from "react";
import "./App.css";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import Fish from "./Fish.js";
import Bugs from "./Bugs.js";
import tanWave from "./assets/Tan-wave-Desktop.svg";
import logo from "./assets/new-horizons-logo-Desktop.png";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      activeTab: "Bugs",
    };

    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Critterpedia Guide</h1>
          <img src={tanWave} className="tanWave" />
        </header>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "Fish",
              })}
              onClick={() => {
                this.toggleTab("Fish");
              }}
            >
              Fish
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "Bugs",
              })}
              onClick={() => {
                this.toggleTab("Bugs");
              }}
            >
              Bugs
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="Fish">
            <Fish />
          </TabPane>
          <TabPane tabId="Bugs">
            <Bugs />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default App;
