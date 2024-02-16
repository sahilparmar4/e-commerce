import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import Cart from './Cart';

const Header: React.FC = () => {
  // Show counts inside the cart and welcoming the user
    const cartCount: any = useSelector((state: any) => state); 
    const [hoverEffect, setHoverEffect] = useState<any>(false); 
    
  return (
    
    <>
        <div className='bg-pink-500'>
            <h1 className='text-white min-h-10 text-medum text-2xl'>
                Welcome {localStorage?.getItem("user")} to this E-commerce site :)
            </h1>
            <span className='absolute inset-y-0 right-8 cursor-pointer'>
                <img src={process.env.PUBLIC_URL+"/shopping-cart.png"} className='mt-1' alt="" style={{height: "30px", width: "30px"}} />
                <span
                    className='absolute top-0 right-0 -mt-1 -mr-3 bg-red-500 text-white rounded-full px-2 py-1 text-sx font-bold' onMouseEnter={()=>setHoverEffect(!hoverEffect)}
                  >{cartCount.cart.count}</span>
            </span>
          </div>
          {
              hoverEffect === true ? <Cart cartItems={cartCount.cart} />: <></>
          }
    </>
  )
}

export default Header