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
import { WishListhook } from "./hooks/wishlist";
import { WishContext } from "./context/wishlist";
import Fallback from "./fallbackPage";
import ItemPage from "./Item/itemPage";

function App() {
  const { wishlist, addwishlist, removewishlist } = WishListhook();
  return (
    <React.Fragment>
      <Router>
        <main>
          <WishContext.Provider
            value={{ wishlist, addwishlist, removewishlist }}
          >
            <Navbar />
          </WishContext.Provider>
          <Switch>
            <Route path="/" exact>
              <WishContext.Provider
                value={{ wishlist, addwishlist, removewishlist }}
              >
                <RenderItems />
              </WishContext.Provider>
            </Route>
            <Route path="/:uid/item">
              <ItemPage />
            </Route>
            <Route path="/fallback">
              <Fallback />
            </Route>
            <Route path="/sell">
              <Form />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;
