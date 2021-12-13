import React from "react";
import Item from "./Item";
import DUMMY_DATA from "../DUMMY_DATA";
import "./renderItem.css";
import { Fade } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Items = (props) => {
  return (
    <React.Fragment>
      <Fade in={true}>
        <div>
          <ul>
            {DUMMY_DATA.map((item) => {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  image={item.img}
                  name={item.name}
                  lprice={item.lprice}
                  hprice={item.hprice}
                />
              );
            })}
          </ul>
        </div>
      </Fade>
    </React.Fragment>
  );
};

export default Items;
