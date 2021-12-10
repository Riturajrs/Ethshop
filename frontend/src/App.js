import React from "react";
import "./App.css";
import RenderItems from "./Item/renderItems";
import Fallback from "./fallbackPage";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import ItemPage from "./Item/itemPage";

function App() {
  if (window.ethereum) {
    return (
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
    );
  } else {
    return <Fallback />;
  }
}

export default App;
