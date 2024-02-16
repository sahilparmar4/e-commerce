import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartMain: React.FC = () => {

  // Cart page, listing, subtotal

  const cartListing: any = useSelector((state: any) => state.cart.cartItems);
  const count: any = useSelector((state: any) => state.cart.count);
  const navigate = useNavigate();
  let subTotal: any = 0;
  let cartProducts: any = [];
  
  return (
    <>
      <Header />
      <div className='mt-5 ml-5'>
        {
          cartListing && cartListing.length > 0 ?
            cartListing.map((item: any) => {
              subTotal += item.quantity * item.product.price;
              cartProducts.push(item.product);
              return (
                <>
                  <div className='row mb-5'>
                    <div className='col-4'>
                      <img src={item.product.image} style={{ height: "200px", width: "150px" }} alt="" />
                    </div>
                    <div className='col-6'>
                      <h1 className='text-xl text-pink-500'>{item.product.title}</h1> <span className="mt-5 font-bold">Price: ₹ {item.product.price}</span>
                      <h6 className="text-lg mt-8">Quantity: {item.quantity}</h6>
                    </div>
                    
                  </div>
                </>
              )
            }) :
            <h1 className='text-pink-500 text-semibold'> Your cart is empty. Go to home page for shopping</h1>
        }
        {
          cartListing.length > 0 ?
            <>
              <div className = "my-5">
                <h3 className='text-lg'>SubTotal ({count} item(s)): ₹ {subTotal.toFixed(2)}</h3>
                <button type="button" onClick={()=>{navigate("/your-order", {state: subTotal.toFixed(2)})}} className='mr-16 font-semibold select-none w-32 h-8 text-center rounded-full bg-pink-500 cursor-pointer text-sm text-white'>
                    Proceed to buy
                </button>
              </div>
              </>
            : <></>
        }
      </div>
    </>
  )
}

export default CartMain