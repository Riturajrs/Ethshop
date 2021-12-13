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
import Fallback from "./fallbackPage";
import ItemPage from "./Item/itemPage";

function App() {
  return (
    <React.Fragment>
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
            <Route path="/fallback">
              <Fallback />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;
