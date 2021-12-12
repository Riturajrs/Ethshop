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
import ItemPage from "./Item/itemPage";

function App() {
  return (
    <React.Fragment>
      <Navbar />
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
