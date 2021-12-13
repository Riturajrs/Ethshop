import React, { useState } from "react";
import Heart from "react-heart";
import { useMoralis } from "react-moralis";
import FallBack from "../fallbackPage";
import { Redirect } from "react-router-dom";
import "./Item.css";

const Item = (props) => {
  const [wishlist, setWishlist] = useState(false);
  const [winEth, setWinEth] = useState(true);
  const { isAuthenticated } = useMoralis();
  const wishListHandler = () => {
    if (!window.ethereum) {
      console.log("no eth");
      setWinEth(false);
      return ;
    }
    if (wishlist) {
    }
    setWishlist((prev) => !prev);
  };
  return (
    <React.Fragment>
      {!winEth && <Redirect to="/fallback"/>}
      <li>
        <img src={props.image} alt={props.name} />
        <Heart
          className="heart"
          isActive={wishlist}
          onClick={wishListHandler}
        />
        <br />
        <div className="Title">{props.name}</div>
        {props.lprice} eth - {props.hprice} eth
        <br />
        <a href={`${props.id}/item`}>
          <div className="button">View</div>
        </a>
      </li>
    </React.Fragment>
  );
};

export default Item;
