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
import { WishListhook } from "./hooks/wishlist";
import { WishContext } from "./context/wishlist";
import { AuthContext } from "./context/auth";
import ItemPage from "./Item/itemPage";

function App() {
  const {isLoggedIn,login,logout} = useAuth();
  const { wishlist, addwishlist, removewishlist, getwishlist } = WishListhook();
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
            <WishContext.Provider
              value={{ wishlist, addwishlist, removewishlist, getwishlist }}
            >
              <Navbar />
            </WishContext.Provider>
            <Switch>
              <WishContext.Provider
                value={{ wishlist, addwishlist, removewishlist, getwishlist }}
              >
                <Route path="/" exact>
                  <RenderItems />
                </Route>
              </WishContext.Provider>
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
