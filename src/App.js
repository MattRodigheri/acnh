import React from "react";
import "./App.css";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import Fish from "./Fish.js";
import Bugs from "./Bugs.js";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      activeTab: "Fish",
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
