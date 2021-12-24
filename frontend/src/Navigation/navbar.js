import React, { useState, useContext, useCallback, useEffect } from "react";
import UserIcon from "@material-ui/icons/AccountCircle";
import SellIcon from "@material-ui/icons/AddShoppingCart";
import { AuthContext } from "../context/auth";
import { WishContext } from "../context/wishlist";
import { Link } from "react-router-dom";
import "../App.css";
import "./navbar.css";

function Navbar() {
  const [showLinks, setShowLinks] = useState(true);
  const [userData, setuserData] = useState();
  const { wishlist, getwishlist } = useContext(WishContext);
  const { isLoggedIn,logout } = useContext(AuthContext);
  const wishitems = wishlist.length;
  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <React.Fragment>
      <div className="Navbar">
        <div className="leftSide">
          <div className="links">
            <Link to="/" style={{"textDecoration":"none"}}>
              <h1>Broker_101</h1>
            </Link>
          </div>
        </div>
        <div className="rightSide">
          <div className="links">
            {isLoggedIn && (
              <Link to="/wishlist" className="wishlist" style={{"textDecoration":"none"}}>
                  Wishlist
                  {wishitems ? ": " + wishitems : ""}
              </Link>
            )}
            {isLoggedIn && (
                <Link to="/sellitem" style={{"textDecoration":"none"}}>
                  {" "}
                  <SellIcon />{" "}
                </Link>
            )}
            {isLoggedIn && (
                <Link to="/user" style={{"textDecoration":"none"}}>
                  {" "}
                  <UserIcon />{" "}
                </Link>
            )}
            {!isLoggedIn && <Link to="/auth" style={{"textDecoration":"none"}}>Login</Link>}
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
