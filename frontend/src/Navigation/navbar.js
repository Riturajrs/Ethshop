import React, { useState, useContext, useCallback, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ReorderIcon from "@material-ui/icons/Reorder";
import UserIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SellIcon from "@material-ui/icons/AddShoppingCart";
import { Redirect } from "react-router-dom";
import { useMoralis } from "react-moralis";
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
    if (!window.ethereum) {
      setWinEth(false);
      return;
    }
    authenticate();
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
  };
  const LoginDB = async () => {
    const username = user.get("username");
    let responseData;
    try {
      responseData = await sendRequest(
        `http://localhost:5000/api/users/login`,
        "POST",
        JSON.stringify({
          username: username,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
    setuserData(responseData);
    if (userData) {
      getwishlist(userData.wishlist);
    }
    console.log(userData);
  };
  useEffect(() => {
    if (user) {
      LoginDB();
    }
  }, [isAuthenticated]);
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
      )}
    </React.Fragment>
  );
}

export default Navbar;
