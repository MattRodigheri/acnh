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
          fishName[0] =
            fishName[0].charAt(0).toUpperCase() + fishName[0].slice(1);
          fishName[1] =
            fishName[1].charAt(0).toUpperCase() + fishName[1].slice(1);
          fishName = `${fishName[0]} ${fishName[1]}`;
        } else {
          fishName = key.charAt(0).toUpperCase() + key.slice(1);
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
                timespan.northern.includedMonths.push(
                  moment(String(i)).format("MMMM")
                );
              }
            } else {
              for (
                let i = response.data[key].availability["month-northern"].split(
                  "-"
                )[0];
                i <= 12;
                i++
              ) {
                timespan.northern.includedMonths.push(
                  moment(String(i)).format("MMMM")
                );
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
                timespan.northern.includedMonths.push(
                  moment(String(i)).format("MMMM")
                );
              }
            }

            northStartMonth = moment(
              response.data[key].availability["month-northern"].split("-")[0]
            ).format("MMMM");

            northEndMonth = moment(
              response.data[key].availability["month-northern"].split("-")[1]
            ).format("MMMM");

            northMonths = `${northStartMonth} - ${northEndMonth}`;
            timespan.northern.value = northMonths;

            if (
              Number(
                response.data[key].availability["month-southern"].split("-")[0]
              ) <
              Number(
                response.data[key].availability["month-southern"].split("-")[1]
              )
            ) {
              for (
                let i = response.data[key].availability["month-southern"].split(
                  "-"
                )[0];
                i <=
                response.data[key].availability["month-southern"].split("-")[1];
                i++
              ) {
                timespan.southern.includedMonths.push(
                  moment(String(i)).format("MMMM")
                );
              }
            } else {
              for (
                let i = response.data[key].availability["month-southern"].split(
                  "-"
                )[0];
                i <= 12;
                i++
              ) {
                timespan.southern.includedMonths.push(
                  moment(String(i)).format("MMMM")
                );
              }
              for (
                let i = 1;
                i <=
                Number(
                  response.data[key].availability["month-southern"].split(
                    "-"
                  )[1]
                );
                i++
              ) {
                timespan.southern.includedMonths.push(
                  moment(String(i)).format("MMMM")
                );
              }
            }

            southStartMonth = moment(
              response.data[key].availability["month-southern"].split("-")[0]
            ).format("MMMM");

            southEndMonth = moment(
              response.data[key].availability["month-southern"].split("-")[1]
            ).format("MMMM");

            southMonths = `${southStartMonth} - ${southEndMonth}`;
            timespan.southern.value = southMonths;
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
              time: response.data[key].availability.time,
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
      value === "4pm - 9am" ||
      value === "9pm - 4am" ||
      value === "4am - 9pm" ||
      value === "9am - 4pm"
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
          (fish.availability.time === this.state.time ||
            fish.availability.time === "Any") &&
          fish.availability.location === this.state.location &&
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
          (fish.availability.time === this.state.time ||
            fish.availability.time === "Any") &&
          fish.availability.location === this.state.location
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
          (fish.availability.time === this.state.time ||
            fish.availability.time === "Any") &&
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
        if (fish.availability.location === this.state.location) {
          return fish;
        }
      }

      if (
        this.state.time !== "allTimes" &&
        this.state.location === "allLocations" &&
        this.state.month === "allYear"
      ) {
        if (
          fish.availability.time === this.state.time ||
          fish.availability.time === "Any"
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
          (fish.availability.location === this.state.location &&
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
