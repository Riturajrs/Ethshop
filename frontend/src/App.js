import React from "react";
import "./App.css";
import Navbar from "./Navigation/navbar";
import RenderItems from "./Item/renderItems";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useMoralis } from "react-moralis";
import ItemPage from "./Item/itemPage";

function App() {
  const { authenticate, isAuthenticated, user, logout, isAuthenticating } = useMoralis();
  const loginHandler = (e) => {
    e.preventDefault();
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
      <Navbar />
      {!isAuthenticated && <button disabled={isAuthenticating} onClick={loginHandler}>LOGIN</button>}
      {isAuthenticated && <button disabled={isAuthenticating} onClick={logoutHandler}>LOGOUT</button>}
      <Router>
        <main>
          <Switch>
            <Route path="/" exact>
              <RenderItems />
            </Route>
            <Route path="/:uid/item">
              <ItemPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;
