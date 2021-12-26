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
import { useAuth, WishListhook } from "./hooks/auth-hook";
import { AuthContext } from "./context/auth";
import ItemPage from "./Item/itemPage";

function App() {
  const { wishlist, addwishlist, removewishlist, getwishlist } = WishListhook();
  const { userId, item, setitem, isLoggedIn, login, logout } = useAuth();
  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          wishlist: wishlist,
          items: item,
          isLoggedIn: isLoggedIn,
          userId: userId,
          login: login,
          logout: logout,
          setitem: setitem,
          addwishlist: addwishlist,
          removewishlist: removewishlist,
          getwishlist: getwishlist
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
              {isLoggedIn && (
                <Route path="/sell">
                  <Form />
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
