import React from "react";

class BugHeadings extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    return (
      <div className="bugTableHeadings">
        <p>Name</p>
        <div>
          <p>Yearly Availability</p>
          <select
            onChange={(event) => {
              this.props.handleFilter(event.target.value);
            }}
          >
            <option value="allYear">All Year</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
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
            {/* <option value="4pm - 9am">4pm - 9am</option>
            <option value="9pm - 4am">9pm - 4am</option>
            <option value="4am - 9pm">4am - 9pm</option>
            <option value="9am - 4pm">9am - 4pm</option> */}
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
            <option value="Flying">Flying</option>
            <option value="Trees">Trees</option>
            <option value="Ground">Ground</option>
            <option value="Flowers">Flowers</option>
            <option value="Water">Water</option>
            <option value="Beach">Beach</option>
            <option value="Rocks">Rocks</option>
            <option value="Trash">Trash</option>
            <option value="Misc">Misc.</option>
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

        <p>Nook's Price</p>
        <p>Flick's Price</p>
        <select onChange={(event) => this.props.handleSort(event.target.value)}>
          <option value="a-z">Price</option>
          <option value="highToLow">High to Low</option>
          <option value="lowToHigh">Low to High</option>
        </select>
      </div>
    );
  }
}

export default BugHeadings;
