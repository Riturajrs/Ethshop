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
  console.log(show);
  return (
    <React.Fragment>
      <Fade in={true}>
        <div>
            <h1>Wishlist</h1>
        {show && <MessageModal show={show} onClear={setShow(false)} heading="Wishlist is empty!" message="Please add a item to wishlist"/>}
          <ul>
            {DUMMY_DATA.map((item) => {
              const wish = wishlist.find((i) => i === item.id) ? true : false;
              if (wish) {
                return (
                  <Item
                    wishlist={wish}
                    key={item.id}
                    id={item.id}
                    image={item.img}
                    name={item.name}
                    lprice={item.lprice}
                    hprice={item.hprice}
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
