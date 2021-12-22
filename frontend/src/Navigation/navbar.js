import React, { useState, useContext, useCallback, useEffect } from "react";
import UserIcon from "@material-ui/icons/AccountCircle";
import SellIcon from "@material-ui/icons/AddShoppingCart";
import { NavLink } from "react-router-dom";
import { WishContext } from "../context/wishlist";
import "../App.css";
import "./navbar.css";

function Navbar() {
  const [showLinks, setShowLinks] = useState(true);
  const [userData, setuserData] = useState();
  const { wishlist, getwishlist } = useContext(WishContext);
  const wishitems = wishlist.length;
  const loginHandler = (e) => {
    e.preventDefault();
  };

  const logoutHandler = (e) => {
    e.preventDefault();
  };
  const isAuthenticated = false;
  return (
    <React.Fragment>
      <div className="Navbar">
        <div className="leftSide">
          <div className="links">
            <a href="/">
              <button><h1>Broker_101</h1></button>
            </a>
          </div>
        </div>
        <div className="rightSide">
          <div className="links">
            {isAuthenticated && (
              <a href="/wishlist" className="wishlist">
                <button>
                  Wishlist
                  {wishitems ? ": " + wishitems : ""}
                </button>
              </a>
            )}
            {isAuthenticated && (
              <button>
                <a href="/sellitem">
                  {" "}
                  <SellIcon />{" "}
                </a>
              </button>
            )}
            {isAuthenticated && (
              <button>
                <a href="/user">
                  {" "}
                  <UserIcon />{" "}
                </a>
              </button>
            )}
            {!isAuthenticated && <button onClick={loginHandler}>Login</button>}
            {isAuthenticated && <button onClick={logoutHandler}>Logout</button>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
