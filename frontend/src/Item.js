import React from "react";
import "./Item.css";

const Item = (props) => {
  return (
    <li>
      <img src={props.image} alt={props.name} /> <br />
      <div className="Title">{props.name}</div>
      {props.lprice} eth - {props.hprice} eth
      <br/>
      <div className="button" >View</div>
    </li>
  );
};

export default Item;
