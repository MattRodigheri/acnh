import React from "react";

class FishHeadings extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    return (
      <div className="tableHeadings">
        <div>
          <p>Name</p>
          <select
            onChange={(event) => this.props.handleSort(event.target.value)}
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
        <div>
          <p>Hemisphere</p>
          <select
            onChange={(event) => {
              this.props.handleFilter(event.target.value);
            }}
          >
            <option value="northern">Northern </option>
            <option value="southern">Southern </option>
          </select>
        </div>

        <div>
          <p>Time of Day</p>
          <select
            onChange={(event) => {
              this.props.handleFilter(event.target.value);
            }}
          >
            <option value="allTimes">All</option>
            <option value="4pm - 9am">4pm - 9am</option>
            <option value="9pm - 4am">9pm - 4am</option>
            <option value="4am - 9pm">4am - 9pm</option>
            <option value="9am - 4pm">9am - 4pm</option>
          </select>
        </div>

        <div>
          <p>Location</p>
          <select
            onChange={(event) => {
              this.props.handleFilter(event.target.value);
            }}
          >
            <option value="allLocations">All</option>
            <option value="River">River</option>
            <option value="Pond">Pond</option>
            <option value="Sea">Sea</option>
            <option value="Pier">Pier</option>
          </select>
        </div>

        <p>Rarity</p>
        <p>Shadow</p>
        <p>Nook's Price</p>
        <p>CJ's Price</p>
        <select onChange={(event) => this.props.handleSort(event.target.value)}>
          <option value="a-z">Price</option>
          <option value="highToLow">High to Low</option>
          <option value="lowToHigh">Low to High</option>
        </select>
      </div>
    );
  }
}

export default FishHeadings;
