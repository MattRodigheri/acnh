import React from "react";
import axios from "axios";
import moment from "moment";
import FishHeadings from "./FishHeadings.js";
import EachFish from "./EachFish.js";

class Fish extends React.Component {
  constructor() {
    super();

    this.state = {
      fish: [],
      originalFish: [],
      hemisphere: "northern",
    };

    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
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

          if (response.data[key].availability["month-northern"] === "") {
            northMonths = "Year-Round";
          } else {
            northStartMonth = moment(
              response.data[key].availability["month-northern"].split("-")[0]
            ).format("MMMM");

            northEndMonth = moment(
              response.data[key].availability["month-northern"].split("-")[1]
            ).format("MMMM");

            northMonths = `${northStartMonth} - ${northEndMonth}`;
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

          allFish.push({
            name: fishName,
            availability: {
              northern: northMonths,
              southern: southMonths,
              time: response.data[key].availability.time,
              location: response.data[key].availability.location,
              rarity: response.data[key].availability.rarity,
            },
            shadow: response.data[key].shadow.split(" ")[0],
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
      this.handleSort("a-z");
    });
  }

  handleSort(value) {
    let sortedFish;

    if (value === "a-z") {
      sortedFish = this.state.fish.sort((a, b) => {
        const nameA = a.name;
        const nameB = b.name;

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      });
    }
    if (value === "z-a") {
      sortedFish = this.state.fish.sort((a, b) => {
        const nameA = a.name;
        const nameB = b.name;

        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
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
      this.setState({ hemisphere: "northern" });
    }
    if (value === "southern") {
      this.setState({ hemisphere: "southern" });
    }
    if (value === "All") {
      let originalFish = this.state.originalFish;
      this.setState({ fish: originalFish });
    }
    let locationFiltered;
    if (
      value === "River" ||
      value === "Pond" ||
      value === "Sea" ||
      value === "Pier"
    ) {
      locationFiltered = this.state.originalFish.filter((fish) => {
        if (fish.availability.location.includes(value)) {
          return fish;
        }
      });
      this.setState({ fish: locationFiltered });
    }
  }

  render() {
    const allFish = this.state.fish.map((fish, index) => {
      return (
        <EachFish
          key={index}
          fish={fish}
          hemisphere={this.state.hemisphere}
          // location={this.state.location}
        />
      );
    });

    return (
      <div className="fishTable">
        <h1>Fish</h1>
        <FishHeadings
          handleSort={this.handleSort}
          handleFilter={this.handleFilter}
        />
        {allFish}
      </div>
    );
  }
}

export default Fish;