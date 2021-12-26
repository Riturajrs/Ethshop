import React, { useState, useContext } from "react";
import UserIcon from "@material-ui/icons/AccountCircle";
import { Fade } from "reactstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import Auth from "../Auth/user/pages/Auth";
import "../App.css";
import "./navbar.css";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const { isLoggedIn, logout,wishlist } = useContext(AuthContext);
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
      {showLogin && (
        <Auth show={showLogin} onClear={() => setShowLogin(false)} />
      )}
      <div className="Navbar">
        <div className="leftSide">
          <div className="links">
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1>Broker_101</h1>
            </Link>
          </div>
        </div>
        <div className="rightSide">
          {!isLoggedIn && (
            <button onClick={loginHandler} id="login">
              Login
            </button>
          )}
          {isLoggedIn && (
            <Fade in={true}>
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle id="dropdown">
                  <UserIcon />
                </Dropdown.Toggle>

                <Dropdown.Menu id="menu">
                  <Dropdown.Item>
                    <Link to="/wishlist" className="listitem">
                      Wishlist
                      {wishitems ? ": " + wishitems : ""}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/sell" className="listitem">
                      {" "}
                      Sell Item{" "}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/myitem" className="listitem">
                      {" "}
                      My Items{" "}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <div onClick={logoutHandler}>Logout</div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Fade>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
