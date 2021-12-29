import React, {useContext } from "react";
import Item from "./Item";
import "./renderItem.css";
import { AuthContext } from "../context/auth";
import { Fade } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Items = (props) => {
  const {wishlist} = useContext(AuthContext);
  return (
    <React.Fragment>
        <Fade in={true}>
          <div>
            <ul>
              {props.items.map((item) => {
                console.log(item);
                const wish = wishlist.find(i => i === item.id )?true:false;
                return (
                  <Item
                    wishlist={wish}
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.title}
                    lprice={item.lPrice}
                    hprice={item.hPrice}
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
