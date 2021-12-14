import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ReorderIcon from "@material-ui/icons/Reorder";
import UserIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SellIcon from '@material-ui/icons/AddShoppingCart';
import { Redirect } from "react-router-dom";
import { useMoralis } from "react-moralis";
import "../App.css";
import "./navbar.css";

function Navbar() {
  const [showLinks, setShowLinks] = useState(true);
  const [winEth, setWinEth] = useState(true);
  const {
    authenticate,
    isAuthenticated,
    user,
    logout,
    isAuthenticating,
    isLoggingOut,
  } = useMoralis();
  const loginHandler = (e) => {
    e.preventDefault();
    if(!window.ethereum){
        setWinEth(false);
        return;
    }
    authenticate();
  };
  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
  };
  if (user) {
    console.log(user.get("ethAddress"));
  }
  return (
    <React.Fragment>
        {!winEth && <Redirect to="/fallback"/>}
        { winEth && <div className="Navbar">
          <div className="leftSide">
            <div className="links">
              <a href="/home">OLX</a>
            </div>
          </div>
          <div className="middile">
            <input type="text" placeholder="Search.." />
            <button type="sumbmit">
              <SearchIcon />
            </button>
          </div>
          <div className="rightSide">
            <button onClick={() => setShowLinks(!showLinks)}>
              <ReorderIcon />
            </button>
            <div className="links" id={showLinks ? "hidden" : ""}>
              {isAuthenticated && (
                <a href="/wishlist">
                  {" "}
                  <FavoriteIcon />{" "}
                </a>
              )}
              {isAuthenticated && (
                <a href="/metamask">
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
              {isAuthenticated && (
                <a href="/sell">
                  {" "}
                  Sell Now{" "}
                </a>
              )}
              {!isAuthenticated && (
                <button disabled={isAuthenticating} onClick={loginHandler}>
                  Login
                </button>
              )}
              {isAuthenticated && (
                <button disabled={isLoggingOut} onClick={logoutHandler}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

export default Navbar;
