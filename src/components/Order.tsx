import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../store/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const Order: React.FC = () => {

  const [address, setAddress] = useState<any>(""); // Get the address
  const [finalAddress, setFinalAddress] = useState<any>("");
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const cartProducts = useSelector((state: any) => state.cart.cartItems); // to fetch the items for removing purpose once order gets placed
  const navigate = useNavigate();
  return (
    <>
      <div className='bg-pink-500'>
        <center className='text-white min-h-10 text-medum font-bold text-2xl'>
            Checkout
        </center>
      </div>
      <div className='row mt-5 ml-5'>
        <div className="mb-3 col-6">
          <label htmlFor="address" className="form-label">Delivery Address: </label>
          <textarea className="form-control w-64 border-2" value={address} onChange={(e)=>{setAddress(e.target.value)}} id="exampleFormControlTextarea1" rows={3}></textarea>
          <button type="button" onClick={() => {
            setFinalAddress(address);
            setAddress("");
          }} className='mt-8 font-semibold select-none w-40 h-8 text-center rounded-full bg-pink-500 cursor-pointer text-sm text-white'>
            Submit
          </button>
        </div>
        <div className='col-6'>
          <h1>Order Total: ₹ {location.state}</h1>
        </div>
        <p>Use this Address: {finalAddress} </p>
        <button type="button" onClick={() => {
          if (address) {
            alert("Your order is placed, thank you for shopping :)");
            cartProducts.forEach((item: any) => {
              dispatch(removeFromCart(item.product));
            });
            navigate("/products");
          } else {
            alert("Please enter proper delivery address");
          }
        }} className='mt-8 font-semibold select-none w-40 h-8 text-center rounded-full bg-pink-500 cursor-pointer text-sm text-white'>
          Pay & Place Oder
        </button>
      </div>
    </>
  )
}

export default Order