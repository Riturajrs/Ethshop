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
import ItemPage from "./Item/itemPage";
import Modal from "./Modal/Modal";
import ErrorModal from "./Modal/ErrorModal";


function App() {
  const { wishlist, addwishlist, removewishlist, getwishlist } = WishListhook();
  return (
    <React.Fragment>
      <WishContext.Provider value={{ wishlist, addwishlist, removewishlist, getwishlist }}>
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
      </WishContext.Provider>
    </React.Fragment>
  );
}

export default App;
