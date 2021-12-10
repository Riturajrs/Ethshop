import React from "react";
import {Route} from "react-router-dom";
import "./Item.css";

const Item = (props) => {
  return (
    <React.Fragment>
      <li>
        <img src={props.image} alt={props.name} /> <br />
        <div className="Title">{props.name}</div>
        {props.lprice} eth - {props.hprice} eth
        <br />
        <a href={`${props.id}/item`}><div className="button">View</div></a>
      </li>
    </React.Fragment>
  );
};

export default Item;
