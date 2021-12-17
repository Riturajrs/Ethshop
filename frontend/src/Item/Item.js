import React, { useState } from "react";
import Heart from "react-heart";
import { useMoralis } from "react-moralis";
import { Redirect } from "react-router-dom";
import { WishContext } from "../context/wishlist";
import "./Item.css";

const Item = (props) => {
  const [wishlist, setWishlist] = useState(false);
  const [winEth, setWinEth] = useState(true);
  const { isAuthenticated,authenticate } = useMoralis();
  const wishListHandler = () => {
    if (!window.ethereum) {
      setWinEth(false);
      return ;
    }
    if( !isAuthenticated ){
      authenticate();
      return;
    }
    setWishlist((prev) => !prev);
  };

  return (
    <React.Fragment>
      <WishContext.Provider>
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
      </WishContext.Provider>
    </React.Fragment>
  );
};

export default Item;
