import React, { useState, useContext, useCallback, useEffect } from "react";
import UserIcon from "@material-ui/icons/AccountCircle";
import SellIcon from "@material-ui/icons/AddShoppingCart";
import { AuthContext } from "../context/auth";
import { WishContext } from "../context/wishlist";
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
            <a href="/">
              <button><h1>Broker_101</h1></button>
            </a>
          </div>
        </div>
        <div className="rightSide">
          <div className="links">
            {isLoggedIn && (
              <a href="/wishlist" className="wishlist">
                <button>
                  Wishlist
                  {wishitems ? ": " + wishitems : ""}
                </button>
              </a>
            )}
            {isLoggedIn && (
              <button>
                <a href="/sellitem">
                  {" "}
                  <SellIcon />{" "}
                </a>
              </button>
            )}
            {isLoggedIn && (
              <button>
                <a href="/user">
                  {" "}
                  <UserIcon />{" "}
                </a>
              </button>
            )}
            {!isLoggedIn && <button><a href="/auth" style={{"textDecoration":"none"}}>Login</a></button>}
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
