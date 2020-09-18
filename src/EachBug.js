import React from "react";

const EachBug = (props) => {
  return (
    <div className="eachBug">
      <img src={props.bug.image} alt={props.bug.name} />
      <p>{props.bug.name}</p>
      <p>{props.bug.availability[props.hemisphere].value}</p>
      <p>{props.bug.availability.time}</p>
      <p>{props.bug.availability.location}</p>
      <p>{props.bug.availability.rarity.rarity}</p>
      <p>{props.bug.price}</p>
      <p>{props.bug.flickPrice}</p>
      {/* <label class="container">One
  <input type="checkbox" checked="checked">
  <span class="checkmark"></span>
</label> */}

      <label class="container">
        <input
          type="checkbox"
          name="isCaught"
          checked={props.isCaught}
          onChange={() => {
            props.handleInputChange(props.bug.name);
          }}
        />
        <span class="checkmark"></span>
      </label>
    </div>
  );
};

export default EachBug;
