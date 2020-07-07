import React from "react";
import axios from "axios";
import moment from "moment";
import BugHeadings from "./BugHeadings.js";
import EachBug from "./EachBug.js";
import { Cookies } from "react-cookie";

class Bugs extends React.Component {
  constructor() {
    super();

    this.state = {
      originalBugs: [],
      bugs: [],
      hemisphere: "northern",
      month: "allYear",
      time: "allTimes",
      location: "allLocations",
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.filterBugs = this.filterBugs.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const cookies = new Cookies();
    const caughtCookies = cookies.getAll();
    for (let key in caughtCookies) {
      if (caughtCookies[key].includes("*")) {
        this.setState({ [key]: true });
      }
    }

    axios.get("http://acnhapi.com/v1/bugs").then((response) => {
      let allBugs = [];
      let bugName = "";
      for (let key in response.data) {
        if (key.includes("_")) {
          bugName = key.split("_");
          let capitalizedName = [];
          for (let i = 0; i < bugName.length; i++) {
            capitalizedName.push(
              bugName[i].charAt(0).toUpperCase() + bugName[i].slice(1)
            );
          }
          bugName = capitalizedName.join(" ");
        } else {
          bugName = key.charAt(0).toUpperCase() + key.slice(1);
        }
        if (response.data[key]) {
          if (response.data[key].availability.time === "") {
            response.data[key].availability.time = "Any";
          }

          let northStartMonth;
          let northEndMonth;
          let southStartMonth;
          let southEndMonth;
          let northMonths;
          let southMonths;

          let timespan = {
            northern: { value: "", includedMonths: [] },
            southern: { value: "", includedMonths: [] },
          };

          if (
            response.data[key].availability["month-northern"] === "" ||
            response.data[key].availability["month-southern"] === ""
          ) {
            northMonths = "Year-Round";
            southMonths = "Year-Round";
            timespan.northern.value = northMonths;
            timespan.southern.value = southMonths;
            timespan.northern.includedMonths = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            timespan.southern.includedMonths = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
          } else {
            timespan.northern.includedMonths = response.data[key].availability[
              "month-array-northern"
            ].map((month) => {
              if (month === 1) {
                return "January";
              }
              if (month === 2) {
                return "February";
              }
              if (month === 3) {
                return "March";
              }
              if (month === 4) {
                return "April";
              }
              if (month === 5) {
                return "May";
              }
              if (month === 6) {
                return "June";
              }
              if (month === 7) {
                return "July";
              }
              if (month === 8) {
                return "August";
              }
              if (month === 9) {
                return "September";
              }
              if (month === 10) {
                return "October";
              }
              if (month === 11) {
                return "November";
              }
              if (month === 12) {
                return "December";
              }
            });

            if (
              response.data[key].availability["month-northern"].includes("&")
            ) {
              let firstPeriod = response.data[key].availability[
                "month-northern"
              ].split("&")[0];
              let secondPeriod = response.data[key].availability[
                "month-northern"
              ].split("&")[1];

              let firstPeriodNorthStartMonth = moment(
                firstPeriod.split("-")[0]
              ).format("MMMM");

              let firstPeriodNorthEndMonth = moment(
                firstPeriod.split("-")[1]
              ).format("MMMM");

              let secondPeriodNorthStartMonth = moment(
                secondPeriod.split("-")[0]
              ).format("MMMM");

              let secondPeriodNorthEndMonth = moment(
                secondPeriod.split("-")[1]
              ).format("MMMM");

              northMonths = `${firstPeriodNorthStartMonth} - ${firstPeriodNorthEndMonth} & ${secondPeriodNorthStartMonth} - ${secondPeriodNorthEndMonth}`;
              timespan.northern.value = northMonths;
            } else {
              northStartMonth = moment(
                response.data[key].availability["month-northern"].split("-")[0]
              ).format("MMMM");

              northEndMonth = moment(
                response.data[key].availability["month-northern"].split("-")[1]
              ).format("MMMM");

              northMonths = `${northStartMonth} - ${northEndMonth}`;
              timespan.northern.value = northMonths;
            }

            timespan.southern.includedMonths = response.data[key].availability[
              "month-array-southern"
            ].map((month) => {
              if (month === 1) {
                return "January";
              }
              if (month === 2) {
                return "February";
              }
              if (month === 3) {
                return "March";
              }
              if (month === 4) {
                return "April";
              }
              if (month === 5) {
                return "May";
              }
              if (month === 6) {
                return "June";
              }
              if (month === 7) {
                return "July";
              }
              if (month === 8) {
                return "August";
              }
              if (month === 9) {
                return "September";
              }
              if (month === 10) {
                return "October";
              }
              if (month === 11) {
                return "November";
              }
              if (month === 12) {
                return "December";
              }
            });

            if (
              response.data[key].availability["month-southern"].includes("&")
            ) {
              let firstPeriod = response.data[key].availability[
                "month-southern"
              ].split("&")[0];
              let secondPeriod = response.data[key].availability[
                "month-southern"
              ].split("&")[1];

              let firstPeriodSouthStartMonth = moment(
                firstPeriod.split("-")[0]
              ).format("MMMM");

              let firstPeriodSouthEndMonth = moment(
                firstPeriod.split("-")[1]
              ).format("MMMM");

              let secondPeriodSouthStartMonth = moment(
                secondPeriod.split("-")[0]
              ).format("MMMM");

              let secondPeriodSouthEndMonth = moment(
                secondPeriod.split("-")[1]
              ).format("MMMM");

              southMonths = `${firstPeriodSouthStartMonth} - ${firstPeriodSouthEndMonth} & ${secondPeriodSouthStartMonth} - ${secondPeriodSouthEndMonth}`;
              timespan.southern.value = southMonths;
            } else {
              southStartMonth = moment(
                response.data[key].availability["month-southern"].split("-")[0]
              ).format("MMMM");

              southEndMonth = moment(
                response.data[key].availability["month-southern"].split("-")[1]
              ).format("MMMM");

              southMonths = `${southStartMonth} - ${southEndMonth}`;
              timespan.southern.value = southMonths;
            }
          }

          if (response.data[key].availability.location === "") {
            response.data[key].availability.location = "Shaking trees";
          }

          let orderedRarity = {
            value: "",
            rarity: "",
          };
          if (response.data[key].availability.rarity === "Ultra-rare") {
            orderedRarity.value = 1;
            orderedRarity.rarity = response.data[key].availability.rarity;
          }
          if (response.data[key].availability.rarity === "Rare") {
            orderedRarity.value = 2;
            orderedRarity.rarity = response.data[key].availability.rarity;
          }
          if (response.data[key].availability.rarity === "Uncommon") {
            orderedRarity.value = 3;
            orderedRarity.rarity = response.data[key].availability.rarity;
          }
          if (response.data[key].availability.rarity === "Common") {
            orderedRarity.value = 4;
            orderedRarity.rarity = response.data[key].availability.rarity;
          }

          allBugs.push({
            name: bugName,
            availability: {
              northern: timespan.northern,
              southern: timespan.southern,
              time: response.data[key].availability.time,
              location: response.data[key].availability.location,
              rarity: orderedRarity,
            },
            price: response.data[key].price,
            flickPrice: response.data[key]["price-flick"],
            image: response.data[key].image_uri,
          });
        }
      }

      this.setState({
        bugs: allBugs,
        originalBugs: allBugs,
      });
    });
  }

  handleSort(value) {
    let sortedBugs;

    if (value === "-") {
      sortedBugs = this.state.bugs;
    }

    if (value === "mostRare") {
      sortedBugs = this.state.bugs.sort((a, b) => {
        return a.availability.rarity.value - b.availability.rarity.value;
      });
    }
    if (value === "mostCommon") {
      sortedBugs = this.state.bugs.sort((a, b) => {
        return b.availability.rarity.value - a.availability.rarity.value;
      });
    }

    if (value === "lowToHigh") {
      sortedBugs = this.state.bugs.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (value === "highToLow") {
      sortedBugs = this.state.bugs.sort((a, b) => {
        return b.price - a.price;
      });
    }

    this.setState({ bugs: sortedBugs });
  }

  handleFilter(value) {
    if (value === "northern") {
      this.setState({ hemisphere: "northern" }, this.filterBugs);
    }
    if (value === "southern") {
      this.setState({ hemisphere: "southern" }, this.filterBugs);
    }

    if (
      value === "allYear" ||
      value === "January" ||
      value === "February" ||
      value === "March" ||
      value === "April" ||
      value === "May" ||
      value === "June" ||
      value === "July" ||
      value === "August" ||
      value === "September" ||
      value === "October" ||
      value === "November" ||
      value === "December"
    ) {
      this.setState({ month: value }, this.filterBugs);
    }

    if (
      value === "allTimes"
      //   ||
      //   value === "4pm - 9am" ||
      //   value === "9pm - 4am" ||
      //   value === "4am - 9pm" ||
      //   value === "9am - 4pm"
    ) {
      this.setState({ time: value }, this.filterBugs);
    }

    if (
      value === "allLocations" ||
      value === "Flying" ||
      value === "Trees" ||
      value === "Stumps" ||
      value === "Ground" ||
      value === "Flowers" ||
      value === "Ponds" ||
      value === "Beach" ||
      value === "Trash" ||
      value === "Food" ||
      value === "Rocks" ||
      value === "Villagers"
    ) {
      this.setState({ location: value }, this.filterBugs);
    }
  }

  filterBugs() {
    const filteredBugs = this.state.originalBugs.filter((bug) => {
      if (
        this.state.time !== "allTimes" &&
        this.state.location !== "allLocations" &&
        this.state.month !== "allYear"
      ) {
        if (
          (bug.availability.time === this.state.time ||
            bug.availability.time === "Any") &&
          bug.availability.location
            .toLowerCase()
            .includes(this.state.location.toLowerCase()) &&
          (bug.availability[this.state.hemisphere].includedMonths.includes(
            this.state.month
          ) ||
            bug.availability[this.state.hemisphere] === "Year-Round")
        ) {
          return bug;
        }
      }
      if (
        this.state.time !== "allTimes" &&
        this.state.location !== "allLocations" &&
        this.state.month === "allYear"
      ) {
        if (
          (bug.availability.time === this.state.time ||
            bug.availability.time === "Any") &&
          bug.availability.location
            .toLowerCase()
            .includes(this.state.location.toLowerCase())
        ) {
          return bug;
        }
      }
      if (
        this.state.time !== "allTimes" &&
        this.state.location === "allLocations" &&
        this.state.month !== "allYear"
      ) {
        if (
          (bug.availability.time === this.state.time ||
            bug.availability.time === "Any") &&
          (bug.availability[this.state.hemisphere].includedMonths.includes(
            this.state.month
          ) ||
            bug.availability[this.state.hemisphere] === "Year-Round")
        ) {
          return bug;
        }
      }

      if (
        this.state.time === "allTimes" &&
        this.state.location === "allLocations" &&
        this.state.month !== "allYear"
      ) {
        if (
          bug.availability[this.state.hemisphere].includedMonths.includes(
            this.state.month
          ) ||
          bug.availability[this.state.hemisphere] === "Year-Round"
        ) {
          return bug;
        }
      }

      if (
        this.state.time === "allTimes" &&
        this.state.location !== "allLocations" &&
        this.state.month === "allYear"
      ) {
        if (
          bug.availability.location
            .toLowerCase()
            .includes(this.state.location.toLowerCase())
        ) {
          return bug;
        }
      }

      if (
        this.state.time !== "allTimes" &&
        this.state.location === "allLocations" &&
        this.state.month === "allYear"
      ) {
        if (
          bug.availability.time.includes(this.state.time) ||
          bug.availability.time === "Any"
        ) {
          return bug;
        }
      }
      if (
        this.state.time === "allTimes" &&
        this.state.location !== "allLocations" &&
        this.state.month !== "allYear"
      ) {
        if (
          (bug.availability.location
            .toLowerCase()
            .includes(this.state.location.toLowerCase()) &&
            bug.availability[this.state.hemisphere].includedMonths.includes(
              this.state.month
            )) ||
          bug.availability[this.state.hemisphere] === "Year-Round"
        ) {
          return bug;
        }
      }
      if (
        this.state.time === "allTimes" &&
        this.state.location === "allLocations" &&
        this.state.month === "allYear"
      ) {
        return bug;
      }
      return "";
    });

    this.setState({
      bugs: filteredBugs,
    });
  }

  handleInputChange(name) {
    const cookies = new Cookies();
    if (!this.state[name]) {
      cookies.set(`${name}`, `*${name}`);
      this.setState({ [name]: true });
    } else {
      cookies.remove(name);
      this.setState({ [name]: false });
    }
  }

  render() {
    const allBugs = this.state.bugs.map((bug, index) => {
      let isCaught;
      if (this.state[bug.name]) {
        isCaught = true;
      } else {
        isCaught = false;
      }

      return (
        <EachBug
          key={index}
          bug={bug}
          hemisphere={this.state.hemisphere}
          handleInputChange={this.handleInputChange}
          isCaught={isCaught}
        />
      );
    });

    return (
      <div>
        <div className="bugsTitle">
          <h1>Bugs</h1>
          <div className="hemisphereSelect">
            <select
              onChange={(event) => {
                this.handleFilter(event.target.value);
              }}
            >
              <option value="northern">Northern Hemisphere</option>
              <option value="southern">Southern Hemisphere</option>
            </select>
          </div>
        </div>
        <div className="bugTable">
          <BugHeadings
            handleSort={this.handleSort}
            handleFilter={this.handleFilter}
          />
          {allBugs}
        </div>
      </div>
    );
  }
}

export default Bugs;
