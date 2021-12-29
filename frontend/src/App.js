import React from "react";
import "./App.css";
import Navbar from "./Navigation/navbar";
import AllItems from "./Item/allItems";
import Form from "./sellingForm/form";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./context/auth";
import Wishlist from "./wishlist/wishlistData";
import ItemPage from "./Item/itemId";

function App() {
  const {
    wishlist,
    userId,
    item,
    setitem,
    isLoggedIn,
    login,
    SetWishlist,
    logout,
  } = useAuth();
  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          wishlist: wishlist,
          items: item,
          isLoggedIn: isLoggedIn,
          userId: userId,
          SetWishlist: SetWishlist,
          login: login,
          logout: logout,
          setitem: setitem,
        }}
      >
        <Router>
          <main>
            <Navbar />
            <Switch>
              <Route path="/" exact>
                <AllItems />
              </Route>
              <Route path="/:uid/item">
                <ItemPage />
              </Route>
              {isLoggedIn && (
                <Route path="/sell">
                  <Form />
                </Route>
              )}
              {isLoggedIn && (
                <Route path="/wishlist">
                  <Wishlist />
                </Route>
              )}
              <Redirect to="/" />
            </Switch>
          </main>
        </Router>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
