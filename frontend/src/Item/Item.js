import React, { useState,useContext } from "react";
import Heart from "react-heart";
import { Redirect } from "react-router-dom";
import { WishContext } from "../context/wishlist";
import "./Item.css";

const Item = (props) => {
  const [wishstate, setWishstate] = useState(props.wishlist);
  const { addwishlist, removewishlist,wishlist } = useContext(WishContext);
  const wishListHandler = () => {
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
