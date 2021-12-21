import React, { useState, useContext, useCallback, useEffect } from "react";
import UserIcon from "@material-ui/icons/AccountCircle";
import SellIcon from "@material-ui/icons/AddShoppingCart";
import { Redirect } from "react-router-dom";
import { WishContext } from "../context/wishlist";
import { useHttpClient } from "../hooks/http-hook";
import "../App.css";
import "./navbar.css";

function Navbar() {
  const [showLinks, setShowLinks] = useState(true);
  const [winEth, setWinEth] = useState(true);
  const [userData, setuserData] = useState();
  const { wishlist, getwishlist } = useContext(WishContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const wishitems = wishlist.length;
  const loginHandler = (e) => {
    e.preventDefault();
  };

  const logoutHandler = (e) => {
    e.preventDefault();
  };
  const isAuthenticated = true;
  return (
    <React.Fragment>
      {!winEth && <Redirect to="/fallback" />}
      {winEth && (
        <div className="Navbar">
          <div className="leftSide">
            <div className="links">
              <a href="/home">Broker_101</a>
            </div>
          </div>
          <div className="rightSide">
            <div className="links">
              {isAuthenticated && (
                <a href="/wishlist" className="wishlist">
                  Wishlist
                  {wishitems ? ": "+wishitems : ""}
                </a>
              )}
              {isAuthenticated && (
                <a href="/sellitem">
                  {" "}
                  <SellIcon />{" "}
                </a>
              )}
              {isAuthenticated && (
                <a href="/user">
                  {" "}
                  <UserIcon />{" "}
                </a>
              )}
              {!isAuthenticated && (
                <button onClick={loginHandler}>
                  Login
                </button>
              )}
              {isAuthenticated && (
                <button onClick={logoutHandler}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Navbar;
