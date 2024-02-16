import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { removeFromCart, updateQuantity } from '../store/cart/cartSlice';

interface cartItemType{
  cartItems: any
}

const Cart: React.FC<cartItemType> = (props) => {
  const [selectQty, setSelectQty] = useState<any>(1);
  const dispatch = useDispatch<any>();

  // Update the quantity
  const selectQtyHandler = (product: any, qty: any) => {
    setSelectQty(qty);
    dispatch(updateQuantity({productId: product.id, quantity: qty}));
  }

  return (
    <>
      
      <div className="w-48 border-black h-auto  border max-h-screen overflow-y-auto overflow-x-hidden scrollbar-hide bg-gray-100 float-right fixed m-12 inset-y-0 right-0 -top-2">
        <div className="row mb-2">
          {/* Cart items listing */}
          {
            props.cartItems.cartItems.length > 0 ? 
              <>
                  <Link to="/cart" className='col-12 rounded-lg w-40 p-auto m-auto text-center mb-2 bg-white'>
                    Go to Cart
                  </Link>
                  <p className='text-xs flex text-center mb-1'>Qty 0 will be considered as deleted (Remove from cart)</p>
                <div className='col-12'>
                  {
                    props.cartItems.cartItems.map((item: any) => {
                      return (
                        <>
                          <center className='bg-white rounded-lg w-40 m-auto'>
                            <img src={item.product.image} className='h-24' alt=''/>
                          </center>
                          <div className='mt-1 row'>
                            <div className='col-3 w-1/3'>
                              <select name='Qty' className='ml-4' value={item.quantity} onChange={(e: any) =>selectQtyHandler(item.product, e.target.value)}>

                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                              </select>
                            </div>
                            <div className='col-3 w-1/3 flex text-left'>
                              <span className='text-sm text-black-300 mt-1'>₹{item.product.price}</span>
                            </div>
                            <div className='col-3 w-1/3'>
                              <img src= {process.env.PUBLIC_URL + "/dustbin.png"} onClick={()=>{dispatch(removeFromCart(item.product))}} className='bg-white-500 cursor-pointer mt-1' alt="" style={{height:"15px", width: "15px"}} />
                            </div>
                        </div>
                        </>
                      )
                    })
                  }
                    

                </div>
              </> :
            <h1 className='m-auto'> Your Cart is empty</h1>
          }
        </div>
      </div>
    </>
  )
}

export default Cart