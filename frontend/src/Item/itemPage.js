import React, { useCallback, useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import Checkout from '../Checkout/checkout'; 
import ErrorModal from "../Modal/ErrorModal";
import "./itemPage.css";



const Page = (props) => {
  const [ itemImage,setItemImage ] = useState();
  const checkoutHandler = async(e) => {
    e.preventDefault();
    try{await Checkout(props.items.lPrice.toString(),"0x1e47b293AF32C98c0C7FfF7539E9798E7e265Fd2")
  }catch(err){
    console.log(err);
  } 
  }
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
                {props.items.lPrice} Wei
              </span>
            </div>
            <p>{props.items.description}</p>
            <p>Seller : {props.creator} </p>
              <button className="cart" onClick={checkoutHandler} >Buy Now</button>
          </div>
        </div>
    </React.Fragment>
  );
};

export default Page;
