import React, { useState, useContext, useCallback, useEffect } from "react";
import UserIcon from "@material-ui/icons/AccountCircle";
import SellIcon from "@material-ui/icons/AddShoppingCart";
import { AuthContext } from "../context/auth";
import { WishContext } from "../context/wishlist";
import { Link } from "react-router-dom";
import Auth from "../Auth/user/pages/Auth";
import "../App.css";
import "./navbar.css";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [userData, setuserData] = useState();
  const { wishlist, getwishlist } = useContext(WishContext);
  const { isLoggedIn,logout } = useContext(AuthContext);
  const wishitems = wishlist.length;
  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
  };
  const loginHandler = (e) => {
    e.preventDefault();
    setShowLogin(true);
  };
  return (
    <React.Fragment>
      {showLogin && <Auth show={showLogin} onClear={() => setShowLogin(false)}/>}
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
            {!isLoggedIn && <button onClick={loginHandler}>Login</button>}
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
