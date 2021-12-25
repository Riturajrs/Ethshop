import React, { useState, useContext, useCallback, useEffect } from "react";
import UserIcon from "@material-ui/icons/AccountCircle";
import SellIcon from "@material-ui/icons/AddShoppingCart";
import Dropdown from 'react-bootstrap/Dropdown';
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
        {!isLoggedIn && <button onClick={loginHandler} id="login">Login</button>}
        {isLoggedIn && 
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown">
            <UserIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu id="menu">
            <Dropdown.Item>
              <Link to="/wishlist" className="wishlist" style={{"textDecoration":"none"},{"color":"black"}}>
                  Wishlist
                  {wishitems ? ": " + wishitems : ""}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/sell" style={{"textDecoration":"none"},{"color":"black"}}>
                  {" "}
                  SellItem{" "}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/myitem" style={{"textDecoration":"none"},{"color":"black"}}>
                  {" "}
                  MyItem{" "}
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item><div onClick={logoutHandler}>Logout</div></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
