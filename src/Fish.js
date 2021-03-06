import React from "react";
import axios from "axios";
import moment from "moment";
import FishHeadings from "./FishHeadings.js";
import EachFish from "./EachFish.js";

class Fish extends React.Component {
  constructor() {
    super();

    this.state = {
      originalFish: [],
      fish: [],
      hemisphere: "northern",
      month: "allYear",
      time: "allTimes",
      location: "allLocations",
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.filterFish = this.filterFish.bind(this);
  }

  componentDidMount() {
    axios.get("http://acnhapi.com/v1/fish").then((response) => {
      let allFish = [];
      let fishName = "";
      for (let key in response.data) {
        if (key.includes("_")) {
          fishName = key.split("_");
          let capitalizedName = [];
          for (let i = 0; i < fishName.length; i++) {
            capitalizedName.push(
              fishName[i].charAt(0).toUpperCase() + fishName[i].slice(1)
            );
          }
          fishName = capitalizedName.join(" ");
        } else {
          fishName = key.charAt(0).toUpperCase() + key.slice(1);
        }
        if (response.data[key]) {
          let timeOfDay = {
            hours: "",
            group: [],
          };

          if (response.data[key].availability.time === "") {
            timeOfDay.hours = "Any";
          }
          if (response.data[key].availability.time === "4am - 9pm") {
            timeOfDay.hours = response.data[key].availability.time;
            timeOfDay.group.push("4am - 9am", "9am - 4pm", "4pm - 9pm");
          }
          if (response.data[key].availability.time === "9am - 4pm") {
            timeOfDay.hours = response.data[key].availability.time;
            timeOfDay.group.push("9am - 4pm");
          }
          if (response.data[key].availability.time === "4pm - 9am") {
            timeOfDay.hours = response.data[key].availability.time;
            timeOfDay.group.push("4am - 9am", "4pm - 9pm", "9pm - 4am");
          }
          if (response.data[key].availability.time === "9pm - 4am") {
            timeOfDay.hours = response.data[key].availability.time;
            timeOfDay.group.push("9pm - 4am");
          }
          if (
            response.data[key].availability.time === "9am - 4pm & 9pm - 4am"
          ) {
            timeOfDay.hours = response.data[key].availability.time;
            timeOfDay.group.push("9am - 4pm", "9pm - 4am");
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

          let orderedShadow = {
            value: "",
            shadow: "",
          };

          if (response.data[key].shadow.split(" ")[0] === "Smallest") {
            orderedShadow.value = 1;
            orderedShadow.shadow = response.data[key].shadow.split(" ")[0];
          }
          if (response.data[key].shadow.split(" ")[0] === "Small") {
            orderedShadow.value = 2;
            orderedShadow.shadow = response.data[key].shadow.split(" ")[0];
          }
          if (response.data[key].shadow.split(" ")[0] === "Medium") {
            orderedShadow.value = 3;
            orderedShadow.shadow = response.data[key].shadow.split(" ")[0];
          }
          if (response.data[key].shadow.split(" ")[0] === "Narrow") {
            orderedShadow.value = 4;
            orderedShadow.shadow = response.data[key].shadow.split(" ")[0];
          }
          if (response.data[key].shadow.split(" ")[0] === "Large") {
            orderedShadow.value = 5;
            orderedShadow.shadow = response.data[key].shadow.split(" ")[0];
          }
          if (response.data[key].shadow.split(" ")[0] === "Largest") {
            orderedShadow.value = 6;
            orderedShadow.shadow = response.data[key].shadow.split(" ")[0];
          }

          allFish.push({
            name: fishName,
            availability: {
              northern: timespan.northern,
              southern: timespan.southern,
              time: timeOfDay,
              location: response.data[key].availability.location,
              rarity: orderedRarity,
            },
            shadow: orderedShadow,
            price: response.data[key].price,
            cjPrice: response.data[key]["price-cj"],
            image: response.data[key].image_uri,
          });
        }
      }

      this.setState({
        fish: allFish,
        originalFish: allFish,
      });
    });
  }

  handleSort(value) {
    let sortedFish;

    if (value === "-") {
      sortedFish = this.state.fish;
    }

    if (value === "mostRare") {
      sortedFish = this.state.fish.sort((a, b) => {
        return a.availability.rarity.value - b.availability.rarity.value;
      });
    }
    if (value === "mostCommon") {
      sortedFish = this.state.fish.sort((a, b) => {
        return b.availability.rarity.value - a.availability.rarity.value;
      });
    }

    if (value === "smallest") {
      sortedFish = this.state.fish.sort((a, b) => {
        return a.shadow.value - b.shadow.value;
      });
    }
    if (value === "largest") {
      sortedFish = this.state.fish.sort((a, b) => {
        return b.shadow.value - a.shadow.value;
      });
    }

    if (value === "lowToHigh") {
      sortedFish = this.state.fish.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (value === "highToLow") {
      sortedFish = this.state.fish.sort((a, b) => {
        return b.price - a.price;
      });
    }

    this.setState({ fish: sortedFish });
  }

  handleFilter(value) {
    if (value === "northern") {
      this.setState({ hemisphere: "northern" }, this.filterFish);
    }
    if (value === "southern") {
      this.setState({ hemisphere: "southern" }, this.filterFish);
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
      this.setState({ month: value }, this.filterFish);
    }

    if (
      value === "allTimes" ||
      value === "4am - 9am" ||
      value === "9am - 4pm" ||
      value === "4pm - 9pm" ||
      value === "9pm - 4am"
    ) {
      this.setState({ time: value }, this.filterFish);
    }

    if (
      value === "allLocations" ||
      value === "River" ||
      value === "Pond" ||
      value === "Sea" ||
      value === "Pier"
    ) {
      this.setState({ location: value }, this.filterFish);
    }
  }

  filterFish() {
    const filteredFish = this.state.originalFish.filter((fish) => {
      if (
        this.state.time !== "allTimes" &&
        this.state.location !== "allLocations" &&
        this.state.month !== "allYear"
      ) {
        if (
          (fish.availability.time.group.includes(this.state.time) ||
            fish.availability.time.hours === "Any") &&
          fish.availability.location.includes(this.state.location) &&
          (fish.availability[this.state.hemisphere].includedMonths.includes(
            this.state.month
          ) ||
            fish.availability[this.state.hemisphere] === "Year-Round")
        ) {
          return fish;
        }
      }
      if (
        this.state.time !== "allTimes" &&
        this.state.location !== "allLocations" &&
        this.state.month === "allYear"
      ) {
        if (
          (fish.availability.time.group.includes(this.state.time) ||
            fish.availability.time.hours === "Any") &&
          fish.availability.location.includes(this.state.location)
        ) {
          return fish;
        }
      }
      if (
        this.state.time !== "allTimes" &&
        this.state.location === "allLocations" &&
        this.state.month !== "allYear"
      ) {
        if (
          (fish.availability.time.group.includes(this.state.time) ||
            fish.availability.time.hours === "Any") &&
          (fish.availability[this.state.hemisphere].includedMonths.includes(
            this.state.month
          ) ||
            fish.availability[this.state.hemisphere] === "Year-Round")
        ) {
          return fish;
        }
      }

      if (
        this.state.time === "allTimes" &&
        this.state.location === "allLocations" &&
        this.state.month !== "allYear"
      ) {
        if (
          fish.availability[this.state.hemisphere].includedMonths.includes(
            this.state.month
          ) ||
          fish.availability[this.state.hemisphere] === "Year-Round"
        ) {
          return fish;
        }
      }

      if (
        this.state.time === "allTimes" &&
        this.state.location !== "allLocations" &&
        this.state.month === "allYear"
      ) {
        if (fish.availability.location.includes(this.state.location)) {
          return fish;
        }
      }

      if (
        this.state.time !== "allTimes" &&
        this.state.location === "allLocations" &&
        this.state.month === "allYear"
      ) {
        if (
          fish.availability.time.group.includes(this.state.time) ||
          fish.availability.time.hours === "Any"
        ) {
          return fish;
        }
      }
      if (
        this.state.time === "allTimes" &&
        this.state.location !== "allLocations" &&
        this.state.month !== "allYear"
      ) {
        if (
          (fish.availability.location.includes(this.state.location) &&
            fish.availability[this.state.hemisphere].includedMonths.includes(
              this.state.month
            )) ||
          fish.availability[this.state.hemisphere] === "Year-Round"
        ) {
          return fish;
        }
      }
      if (
        this.state.time === "allTimes" &&
        this.state.location === "allLocations" &&
        this.state.month === "allYear"
      ) {
        return fish;
      }
      return "";
    });

    this.setState({
      fish: filteredFish,
    });
  }

  render() {
    const allFish = this.state.fish.map((fish, index) => {
      return (
        <EachFish key={index} fish={fish} hemisphere={this.state.hemisphere} />
      );
    });

    return (
      <div>
        <div className="fishTitle">
          <h1>Fish</h1>
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
        <div className="fishTable">
          <FishHeadings
            handleSort={this.handleSort}
            handleFilter={this.handleFilter}
          />
          {allFish}
        </div>
      </div>
    );
  }
}

export default Fish;
