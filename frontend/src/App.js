import React from "react";
import "./App.css";
import Navbar from "./Navigation/navbar";
import RenderItems from "./Item/renderItems";
import Auth from "./Auth/user/pages/Auth";
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
  const { userId,isLoggedIn, login, logout } = useAuth();
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
        <WishContext.Provider
          value={{ wishlist, addwishlist, removewishlist, getwishlist }}
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
                <Route path="/auth">
                  <Auth/>
                </Route>
                <Redirect to="/" />
              </Switch>
            </main>
          </Router>
        </WishContext.Provider>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
