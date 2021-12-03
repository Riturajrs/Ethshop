import logo from "./logo.svg";
import "./App.css";
import react from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import ItemList from "./components/Item/ItemList";

const App = (props) => {
  return <div>
    <ItemList/>
  </div>;
};

export default App;
// https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/IPhone_1st_Gen.svg/800px-IPhone_1st_Gen.svg.png