import React, { useEffect, useState } from 'react'
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as ReduxAPI from "../store/prodcuts/productDataSlice";
import { Rating } from '@mui/material';
import { addToCart } from '../store/cart/cartSlice';

const ProductDetail:React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const [goToCart, setGoToCart] = useState<any>(false);
  const navigate = useNavigate();
  const getProductDetail = ()=>{
    dispatch(ReduxAPI.getSingleProduct(location.state.id));
  }

  const data: any = useSelector((state: any)=>state.productData.singleProductDetail.data.data);

  // Add product into cart
  const manageCart = () => {
    dispatch(addToCart(data));
    setGoToCart(!goToCart);
  }

  useEffect(()=>{
    getProductDetail();
  }, []);

  return (
    <>
      <Header />
      <div className='mt-3'>
        <div className='row'>
            {
              data && 
              <>
              <div className='col-3'>
                <img src={data?.image} alt=''
                  className='rounded-lg p-6 shadow-2xl object-scale-down max-h-full drop-shadow-md m-auto'
                />
              </div>
              <div className='col-9'>
                <div>
                  <h1 className='font-semibold text-4xl text-pink-500'>
                    {data?.title}
                  </h1>
                  <div className='mt-2 flex text-base'>
                    <span className="text-lg text-base">{data?.rating?.rate}</span>
                    <Rating name="size-large" value={data?.rating?.rate} precision={0.5} readOnly />
                    <span className='text-lg text-black-500'> rating</span>
                  </div>
                </div>
                <hr className='h-px my-2 bg-gray-200 border-0 dark:bg-gray-700'></hr>
                <p className='text-xl'>
                  {data.description}
                </p>
                <span className="text-xs text-base mt-2">₹</span><span className="text-4xl mt-2">{data.price}</span>
                <div>
                <button type="button" onClick={()=>{goToCart === true ? navigate("/"): manageCart()}} className='mt-8 font-semibold select-none w-32 h-8 text-center rounded-full bg-pink-500 cursor-pointer text-sm text-white'>
                  {goToCart === true ? "Proceed to buy" : "Add to Cart"}
                </button>
                </div>
              </div>
              </>
            }
        </div>
      </div>
    </>
  )
}

export default ProductDetail