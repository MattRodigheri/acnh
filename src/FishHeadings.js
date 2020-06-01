import React from "react";

class FishHeadings extends React.Component {
  constructor(props) {
    super(props);
  }

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
        <select
          onChange={(event) => {
            this.props.handleFilter(event.target.value);
          }}
        >
          <option value="northern">Northern Hemisphere</option>
          <option value="southern">Southern Hemisphere</option>
        </select>

        <p>Time of Day</p>

        <div>
          <p>Location</p>
          <select
            onChange={(event) => {
              this.props.handleFilter(event.target.value);
            }}
          >
            <option value="All">All</option>
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
