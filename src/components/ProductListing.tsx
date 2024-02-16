import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import * as ReduxAPI from "../store/prodcuts/productDataSlice"
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material';

const ProductListing:React.FC = () => {
  const dispatch = useDispatch<any>();
  const [manageSearch, setManageSearch] = useState<any>("");
  const [selectRating, setSelectRating] = useState<any>("");
  const [selectPriceRange, setSelectPriceRange] = useState<any>("");
  const [selectCategoreis, setSelectedCategories] = useState<any>([]);

  // Product Lisitng
  const showProducts = ()=>{
    try{
      dispatch(ReduxAPI.products({}));
      dispatch(ReduxAPI.getAllCategories({}));
    }catch(e){
      throw e;
    }
  }

  const data: any = useSelector((state: any)=>state.productData.productListing.data.data);
  const categoryData: any = useSelector((state: any)=>state.productData.categoryListing.data.data);

  // Filter based on category
  const handleCategoryChange = (category: any) => {
    setSelectedCategories((prevCategory: any)=> 
     prevCategory?.includes(category) 
     ? prevCategory?.filter((c: any)=> c !== category) 
     : [...prevCategory, category]);
  }
  
  const filterData = ()=>{
    let filteredData: any = data;

    // Searching
    filteredData = filteredData?.filter((item: any) => item.title.toLowerCase().includes(manageSearch.toLowerCase()) || item.description.toLowerCase().includes(manageSearch.toLowerCase()));

    // Filtered by rating
    if(selectRating === "1-5"){
      filteredData = filteredData.filter((item: any) => item.rating.rate >= 1);
    }else if(selectRating === "2-5"){
      filteredData = filteredData.filter((item: any) => item.rating.rate >= 2);
    }else if(selectRating === "3-5"){
      filteredData = filteredData.filter((item: any) => item.rating.rate >= 3);
    }else if(selectRating === "4-5"){
      filteredData = filteredData.filter((item: any) => item.rating.rate >= 4);
    }else if(selectRating === "5"){
      filteredData = filteredData.filter((item: any) => item.rating.rate === 5);
    }else{
      filteredData = filteredData?.filter((item: any) => item.rating.rate >= 1);
    }

    // Filter by price
    if(selectPriceRange === "1-100"){
      filteredData = filteredData.filter((item: any) => item.price >= 1 && item.price <=100);
    }else if(selectPriceRange === "101-500"){
      filteredData = filteredData.filter((item: any) => item.price >= 101 && item.price <=500);
    }else if(selectPriceRange === "501-1000"){
      filteredData = filteredData.filter((item: any) => item.price >= 501);
    }else{
      filteredData = filteredData?.filter((item: any) => item.price >= 1);
    }

    // Filter by category
    if(selectCategoreis?.length > 0){
      filteredData = filteredData.filter((item: any)=>selectCategoreis.includes(item.category));
    }

    return filteredData;
  }

  const newData: any = filterData();

  useEffect(()=>{
    showProducts();
  }, []);

  return (
    <>
      <Header />
      <div className='row mt-3'>
          <div className='col-3 '>
            <div className="row">
                  <div>
                      <input type="text" value={manageSearch} onChange={(e)=>{setManageSearch(e.target.value)}} className="m-auto w-48 border form-control placeholder: text-xsm placeholder:p-auto" placeholder="Search here..."  />
                  </div>
                  <div className="mt-3 ml-3 font-semibold text-pink-500">
                      Categories:
                  </div>
                  <ul style={{listStyleType: "none"}}>
                      {
                        categoryData && categoryData.map((item: any)=>{
                            return(
                              <>
                              <li className='ml-6'><input type='checkbox' className='pl-3' value={item} onChange={(e)=>{handleCategoryChange(e.target.value)}} />{" "} { item}</li>
                              </>
                            )
                        })
                      }
                  </ul>
                  <div className="mt-3 ml-3 font-semibold text-pink-500">
                      Rating:
                  </div>
                  <select name={"Rating"} className='border w-40 rounded ml-6' value={selectRating} onChange={(e)=>{setSelectRating(e.target.value)}}>
                    <option value="1-5">1 and above</option>
                    <option value="2-5">2 and above</option>
                    <option value="3-5">3 and above</option>
                    <option value="4-5">4 and above</option>
                    <option value="5">5</option>
                  </select>
                  <div className="mt-3 ml-3 font-semibold text-pink-500">
                      Price:
                  </div>
                  <select name={"Price"} className='border w-40 rounded ml-6' value={selectPriceRange} onChange={(e)=>{setSelectPriceRange(e.target.value)}}>
                    <option value="1-100"> Up to ₹100 </option>
                    <option value="101-500"> Between ₹101 to ₹500 </option>
                    <option value="501-1000"> More than ₹500 </option>
                  </select>
            </div>
          </div>         
          <div className='col-9'>
            {
              newData ? newData.map((item: any)=>{
                return(
                  <>
                    <div className={`row ${item?.id !== 1 ? "my-2" : ""}`} key={item?.id}>
                      <Link to = {`/product/${item?.id}`} state = {{id: item?.id}} className='col-4 flex justify-center cursor-pointer bg-gray-100'>
                        <img src={item.image} alt='' style={{height: "200px", width:"200px"}} />
                      </Link>
                      <div className='col-8 '>
                        <div className='mt-2'>
                            <Link to={`/product/${item?.id}`} state = {{id: item?.id}}
                              className='text-pink-700 text-xl cursor-pointer hover: text-orange-500'
                            >
                              {item.title}
                            </Link>
                            <div className='mt-2 flex text-center items-center'>
                                <Rating name="size-small" value={item.rating.rate} precision={0.5} readOnly />
                            </div>
                            <span className="text-sm text-black-500 justify-center mt-1">
                              off
                            </span> <span className='text-sm text-blue-500 mt-1 mx-1'>{" "} {item.rating.count}</span>
                        </div>
                        <h2 className='text-black-700 text-2xl'>
                          <span className='text-sm top-0'>₹</span>{" "} {item.price}
                        </h2>
                        <p className='text-gray-500 text-sm mt-1'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </>
                )
              }):
              <h1 className='text-4xl text-pink-500 font-semibold'> No products found :( </h1>
            }
            
          </div> 
      </div>
    </>
  )
}

export default ProductListing