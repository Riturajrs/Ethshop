import React,{useState} from "react";
import Heart from "react-heart";
import "./Item.css";

const Item = (props) => {
  const [wishlist,setWishlist] = useState(false);
  return (
    <React.Fragment>
      <li>
        <img src={props.image} alt={props.name} />
      <Heart className="heart" isActive={wishlist} onClick={() => setWishlist(!wishlist)}/><br/>
        <div className="Title">{props.name}</div>
        {props.lprice} eth - {props.hprice} eth
        <br />
        <a href={`${props.id}/item`}><div className="button">View</div></a>
      </li>
    </React.Fragment>
  );
};

export default Item;
