import React from "react";

class EachFish extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="eachFish">
        <p>{this.props.fish.name}</p>
        <p>{this.props.fish.availability[this.props.hemisphere].value}</p>
        <p>{this.props.fish.availability.time}</p>
        <p>{this.props.fish.availability.location}</p>
        <p>{this.props.fish.availability.rarity.rarity}</p>
        <p>{this.props.fish.shadow.shadow}</p>
        <p>{this.props.fish.price}</p>
        <p>{this.props.fish.cjPrice}</p>
        <img src={this.props.fish.image} alt={this.props.fish.name} />
      </div>
    );
  }
}

export default EachFish;
