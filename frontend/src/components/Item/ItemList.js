import react from "react";
import Item from "./item";
import DUMMY_DATA from "../DUMMY_DATA";
import "./ItemList.css";

const ItemList = (props) => {
  return (
    <fieldset className="main-list">
      <h1 style={{color: "white"}}>Phones</h1>
      <hr/>
      <ul>{DUMMY_DATA.map((item) => {
        return (
          <li><Item
            image={item.image}
            name={item.name}
            price={item.price}
            rating={item.rating}
          /></li>
        );
      })}</ul>
    </fieldset>
  );
};

export default ItemList;
