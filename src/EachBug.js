import React from "react";

class EachBug extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="eachBug">
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
