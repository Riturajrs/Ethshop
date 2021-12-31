import React, { useContext,useState } from "react";
import Item from "../Item/Item";
import DUMMY_DATA from "../DUMMY_DATA";
import "./wishlist.css";
import { AuthContext } from "../context/auth";
import { Fade } from "reactstrap";
import MessageModal from "../Modal/MessageModal";
import "bootstrap/dist/css/bootstrap.min.css";

const Items = (props) => {
  const { wishlist } = useContext(AuthContext);
  const [show,setShow] = useState(wishlist.length === 0 ? true: false);
  return (
    <React.Fragment>
      <Fade in={true}>
        <div className="Header">
            <h1>Wishlist</h1>
        {show && <MessageModal show={show} onClear={setShow(false)} heading="Wishlist is empty!" message="Please add a item to wishlist"/>}
          <ul>
            {props.items.map((item) => {
              const wish = wishlist.find((i) => i === item.id) ? true : false;
              console.log(item);
              if (wish) {
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
              }
              return <div />;
            })}
          </ul>
        </div>
      </Fade>
    </React.Fragment>
  );
};

export default Items;
