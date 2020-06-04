import React from "react";

class FishHeadings extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    return (
      <div className="tableHeadings">
        <p>Name</p>
        <div>
          <p>Yearly Availability</p>
          <select
            onChange={(event) => {
              this.props.handleFilter(event.target.value);
            }}
          >
            <option value="allYear">All Year</option>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
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

        <div>
          <p>Rarity</p>
          <select
            onChange={(event) => {
              this.props.handleSort(event.target.value);
            }}
          >
            <option value="mostRare">Most Rare</option>
            <option value="mostCommon">Most Common</option>
          </select>
        </div>

        <div>
          <p>Shadow</p>
          <select
            onChange={(event) => {
              this.props.handleSort(event.target.value);
            }}
          >
            <option value="smallest">Smallest</option>
            <option value="largest">Largest</option>
          </select>
        </div>
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
