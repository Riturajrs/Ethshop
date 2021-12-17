import React, { useState,useContext } from "react";
import Heart from "react-heart";
import { useMoralis } from "react-moralis";
import { Redirect } from "react-router-dom";
import { WishContext } from "../context/wishlist";
import "./Item.css";

const Item = (props) => {
  const [wishstate, setWishstate] = useState(props.wishlist);
  const [winEth, setWinEth] = useState(true);
  const { isAuthenticated,authenticate } = useMoralis();
  const { addwishlist, removewishlist,wishlist } = useContext(WishContext);
  const wishListHandler = () => {
    if (!window.ethereum) {
      setWinEth(false);
      return ;
    }
    if( !isAuthenticated ){
      authenticate();
      return;
    }
    if( !wishstate ){
      addwishlist({id: props.id});
    }
    else{
      removewishlist({id: props.id});
    }
    setWishstate((prev) => !prev);
  };
  return (
    <React.Fragment>
      {!winEth && <Redirect to="/fallback"/>}
      <li>
        <img src={props.image} alt={props.name} />
        <Heart
          className="heart"
          isActive={wishstate}
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
