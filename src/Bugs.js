import React from "react";
import axios from "axios";
import moment from "moment";
import BugHeadings from "./BugHeadings.js";
import EachBug from "./EachBug.js";

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
  }

  componentDidMount() {
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
          // bugName[0] = bugName[0].charAt(0).toUpperCase() + bugName[0].slice(1);
          // bugName[1] = bugName[1].charAt(0).toUpperCase() + bugName[1].slice(1);
          // bugName = `${bugName[0]} ${bugName[1]}`;
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
            value: "",
            includedMonths: [],
          };

          if (response.data[key].availability["month-northern"] === "") {
            northMonths = "Year-Round";
            timespan.value = northMonths;
            timespan.includedMonths = [
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
            if (
              Number(
                response.data[key].availability["month-northern"].split("-")[0]
              ) <
              Number(
                response.data[key].availability["month-northern"].split("-")[1]
              )
            ) {
              for (
                let i = response.data[key].availability["month-northern"].split(
                  "-"
                )[0];
                i <=
                response.data[key].availability["month-northern"].split("-")[1];
                i++
              ) {
                timespan.includedMonths.push(moment(String(i)).format("MMMM"));
              }
            } else {
              for (
                let i = response.data[key].availability["month-northern"].split(
                  "-"
                )[0];
                i <= 12;
                i++
              ) {
                timespan.includedMonths.push(moment(String(i)).format("MMMM"));
              }
              for (
                let i = 1;
                i <=
                Number(
                  response.data[key].availability["month-northern"].split(
                    "-"
                  )[1]
                );
                i++
              ) {
                timespan.includedMonths.push(moment(String(i)).format("MMMM"));
              }
            }
            northStartMonth = moment(
              response.data[key].availability["month-northern"].split("-")[0]
            ).format("MMMM");
            northEndMonth = moment(
              response.data[key].availability["month-northern"].split("-")[1]
            ).format("MMMM");
            northMonths = `${northStartMonth} - ${northEndMonth}`;
            timespan.value = northMonths;
          }
          if (response.data[key].availability["month-southern"] === "") {
            southMonths = "Year-Round";
          } else {
            southStartMonth = moment(
              response.data[key].availability["month-southern"].split("-")[0]
            ).format("MMMM");
            southEndMonth = moment(
              response.data[key].availability["month-southern"].split("-")[1]
            ).format("MMMM");
            southMonths = `${southStartMonth} - ${southEndMonth}`;
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
              northern: timespan,
              southern: southMonths,
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
      this.setState({ hemisphere: "northern" });
    }
    if (value === "southern") {
      this.setState({ hemisphere: "southern" });
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
      value === "Ground" ||
      value === "Flowers" ||
      value === "Water" ||
      value === "Beach" ||
      value === "Trash" ||
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
          bug.availability.location === this.state.location &&
          (bug.availability.northern.includedMonths.includes(
            this.state.month
          ) ||
            bug.availability.northern === "Year-Round")
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
          bug.availability.location === this.state.location
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
          (bug.availability.northern.includedMonths.includes(
            this.state.month
          ) ||
            bug.availability.northern === "Year-Round")
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
          bug.availability.northern.includedMonths.includes(this.state.month) ||
          bug.availability.northern === "Year-Round"
        ) {
          return bug;
        }
      }

      if (
        this.state.time === "allTimes" &&
        this.state.location !== "allLocations" &&
        this.state.month === "allYear"
      ) {
        if (bug.availability.location === this.state.location) {
          return bug;
        }
      }

      if (
        this.state.time !== "allTimes" &&
        this.state.location === "allLocations" &&
        this.state.month === "allYear"
      ) {
        if (
          bug.availability.time === this.state.time ||
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
          (bug.availability.location === this.state.location &&
            bug.availability.northern.includedMonths.includes(
              this.state.month
            )) ||
          bug.availability.northern === "Year-Round"
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

  render() {
    const allBugs = this.state.bugs.map((bug, index) => {
      return (
        <EachBug key={index} bug={bug} hemisphere={this.state.hemisphere} />
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
