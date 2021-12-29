import React, { useCallback, useState,useEffect } from "react";
import ErrorModal from "../Modal/ErrorModal";
import "./itemPage.css";
import Data from "../DUMMY_DATA";

const Page = (props) => {
  const [ itemImage,setItemImage ] = useState();
  useEffect(() => {
    const getImage = async() =>{
      try{
        const responseData = await fetch(`http://localhost:5000/api/items/image/${props.items.image}`);
        console.log(responseData.url);
         setItemImage( responseData.url); 
      }catch (err){}
    }
    getImage();
  },[])
  console.log(props.items)
  return (
    <React.Fragment>
      <div className="details">
        <div className="big-img">
          <img src={itemImage} alt={props.items.title} />
          <hr />
        </div>
        <div className="box">
          <div className="row">
            <h2>{props.items.title}</h2>
            <hr />
            <span>
              {props.items.lPrice}eth - {props.items.hPrice}eth
            </span>
          </div>
          <p>{props.items.description}</p>
          <p>Seller : {props.creator} </p>
          <button className="cart">Buy Now</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Page;
