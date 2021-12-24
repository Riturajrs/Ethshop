import React from "react";
import "./App.css";
import Navbar from "./Navigation/navbar";
import RenderItems from "./Item/renderItems";
import Form from "./sellingForm/form";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./context/auth";
import ItemPage from "./Item/itemPage";

function App() {
  const { userId,isLoggedIn, login, logout } = useAuth();
  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
          <Router>
            <main>
              <Navbar />
              <Switch>
                <Route path="/" exact>
                  <RenderItems />
                </Route>
                <Route path="/:uid/item">
                  <ItemPage />
                </Route>
                <Route path="/sell">
                  <Form />
                </Route>
                <Redirect to="/" />
              </Switch>
            </main>
          </Router>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
