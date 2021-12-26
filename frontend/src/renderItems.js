import React from "react";
import Item from "./Item";
import DUMMY_DATA from "./DUMMY_DATA";
import "./renderItem.css";

const Items = (props) => {
  return (
    <div>
      <ul>
        {DUMMY_DATA.map((item) => {
          return (
            <Item
              key={item.id}
              image={item.img}
              name={item.name}
              lprice={item.lprice}
              hprice={item.hprice}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Items;
