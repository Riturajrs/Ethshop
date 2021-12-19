import React from "react";
import { useParams } from "react-router-dom";
import Data from "../DUMMY_DATA";
import "./itemPage.css"

const Page = (props) => {
  const uid = useParams().uid;
  const place = Data.find((item) => {
    return item.id === uid}); 
  return (
    <div className="details">
      <div className="big-img">
        <img src={place.img} alt={place.name} />
        <hr />
      </div>
      <div className="box">
        <div className="row">
          <h2>{place.name}</h2>
          <hr />
          <span>{place.lprice}eth - {place.hprice}eth</span>
        </div>
        <p>{place.desc}</p>
        <p>Seller : {place.creator} </p>
        <button className="cart">Buy Now</button>
      </div> 
    </div>
  );
};

export default Page;
