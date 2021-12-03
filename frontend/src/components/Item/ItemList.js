import react from "react";
import Item from "./item";
import DUMMY_DATA from "../DUMMY_DATA";
import "./ItemList.css";

const ItemList = (props) => {
  return (
    <fieldset className="main-list">
      {DUMMY_DATA.map((item) => {
        return (
          <Item
            image={item.image}
            name={item.name}
            price={item.price}
            rating={item.rating}
          />
        );
      })}
    </fieldset>
  );
};

export default ItemList;
