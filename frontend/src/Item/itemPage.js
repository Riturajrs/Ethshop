import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth'
import Checkout from '../Checkout/checkout'
import ErrorModal from '../Modal/ErrorModal'
import MessageModal from '../Modal/MessageModal'
import './itemPage.css'

const Page = props => {
  const { isLoggedIn } = useContext(AuthContext)
  const [isError, setIsError] = useState(null)
  const [Message, setIsMessage] = useState(null)
  const [itemImage, setItemImage] = useState()
  const checkoutHandler = async e => {
    e.preventDefault()
    if (!window.ethereum) {
      setIsError('No crypto wallet detected!')
      return
    }
    if (!isLoggedIn) {
      setIsMessage('Please login first')
      return
    }
    try {
      const tx = await Checkout({
        ether: props.items.lPrice,
        addr: props.items.Metamask_add
      })
      console.log(tx);
      setIsMessage('Transaction hash: ' + tx.hash)
    } catch (err) {
      setIsMessage(err.message)
    }
  }
  useEffect(() => {
    const getImage = async () => {
      try {
        const responseData = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/items/image/${props.items.image}`
        )
        setItemImage(responseData.url)
      } catch (err) {}
    }
    getImage()
  }, [])
  const ClearError = () => {
    setIsError(null)
  }
  const ClearMessage = () => {
    setIsMessage(null)
  }
  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={ClearError} />
      <MessageModal message={Message} onClear={ClearMessage} />
      <div className='details'>
        <div className='big-img'>
          <img src={itemImage} alt={props.items.title} />
          <hr />
        </div>
        <div className='box'>
          <div className='row'>
            <h2>{props.items.title}</h2>
            <hr />
            <span>{props.items.lPrice} Szabo(Microether)</span>
          </div>
          <p>{props.items.description}</p>
          <p>Seller : {props.creator} </p>
          <button className='cart' type='submit' onClick={checkoutHandler}>
            Buy Now
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Page
