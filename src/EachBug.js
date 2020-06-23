import React from "react";

class EachBug extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCaught: false,
    };
  }

  componentDidMount() {
    if (this.props.caughtBugs.includes(this.props.bug.name)) {
      this.setState({ isCaught: true });
    }
  }

  render() {
    return (
      <div className="eachBug">
        <input
          type="checkbox"
          name="isCaught"
          checked={this.state.isCaught}
          onChange={() => {
            this.setState(
              { isCaught: !this.state.isCaught },
              this.props.handleInputChange(this.props.bug.name)
            );
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
