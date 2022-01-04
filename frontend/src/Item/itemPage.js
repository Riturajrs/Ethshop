import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Checkout from '../Checkout/checkout'
import ErrorModal from '../Modal/ErrorModal'
import './itemPage.css'

const Page = props => {
  const [isError,setIsError] = useState(null);
  const [itemImage, setItemImage] = useState()
  const checkoutHandler = async e => {
    e.preventDefault()
    if(!window.ethereum){
      setIsError("No crypto wallet detected!");
    }
    console.log(props.items);
    try {
      await Checkout(
        props.items.lPrice.toString(),
        props.items.Metamask_add
      )
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const getImage = async () => {
      try {
        const responseData = await fetch(
          `http://localhost:5000/api/items/image/${props.items.image}`
        )
        setItemImage(responseData.url)
      } catch (err) {}
    }
    getImage()
  }, [])
  const ClearError = () => {
    setIsError(null);
  }
  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={ClearError} />
      <div className='details'>
        <div className='big-img'>
          <img src={itemImage} alt={props.items.title} />
          <hr />
        </div>
        <div className='box'>
          <div className='row'>
            <h2>{props.items.title}</h2>
            <hr />
            <span>{props.items.lPrice} Wei</span>
          </div>
          <p>{props.items.description}</p>
          <p>Seller : {props.creator} </p>
          <button className='cart' type="submit" onClick={checkoutHandler}>
            Buy Now
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Page
