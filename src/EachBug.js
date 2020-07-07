import React from "react";
import { Cookies } from "react-cookie";

class EachBug extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="eachBug">
        <input
          type="checkbox"
          name="isCaught"
          checked={this.props.isCaught}
          onChange={() => {
            this.props.handleInputChange(this.props.bug.name);
          }}
        />
        <p>{this.props.bug.name}</p>
        <p>{this.props.bug.availability[this.props.hemisphere].value}</p>
        <p>{this.props.bug.availability.time}</p>
        <p>{this.props.bug.availability.location}</p>
        <p>{this.props.bug.availability.rarity.rarity}</p>
        <p>{this.props.bug.price}</p>
        <p>{this.props.bug.flickPrice}</p>
        <img src={this.props.bug.image} alt={this.props.bug.name} />
      </div>
    );
  }
}

export default EachBug;
