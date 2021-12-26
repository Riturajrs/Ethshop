import React, { useState, useContext } from "react";
import Heart from "react-heart";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import ErrorModal from "../Modal/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";
import Button from "../FormElements/Button";
import "./Item.css";

const Item = (props) => {
  const [wishstate, setWishstate] = useState(props.wishlist || false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { isLoggedIn, getwishlist, userId } = useContext(AuthContext);
  const wishListHandler = async () => {
    const userID = JSON.parse(localStorage.getItem("userData")).userId;
    if (!wishstate) {
      console.log(userID);
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/wishlist`,
          "POST",
          JSON.stringify({
            creator: userID,
            wishlistid: props.id,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        getwishlist(responseData.wishlist);
        setWishstate((prev) => !prev);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/wishlist`,
          "PATCH",
          JSON.stringify({
            creator: userID,
            wishlistid: props.id,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        getwishlist(responseData.wishlist);
        setWishstate((prev) => !prev);
      } catch (err) {}
    }
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li>
        <img src={props.image} alt={props.name} />
        {isLoggedIn && (
          <Heart
            className="heart"
            isActive={wishstate}
            onClick={wishListHandler}
          />
        )}
        <br />
        <div className="Title">{props.name}</div>
        {props.lprice} eth - {props.hprice} eth
        <br />
        <Link to={`${props.id}/item`} style={{ "text-decoration": "none" }}>
          <Button>View</Button>
        </Link>
      </li>
    </React.Fragment>
  );
};

export default Item;
