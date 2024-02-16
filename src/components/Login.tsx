import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as ReduxAPI from "../store/prodcuts/productDataSlice"
import { useNavigate } from 'react-router-dom';

const Login:React.FC = () => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const submitHandler = async ()=>{
    const data: object = {
        username: username,
        password: password
    };
    try{
        if(!username && !password){
            alert("Please enter username and password");
            return false;
        }else if(!username || !password){
            alert("Invalid credentials");
            return false;
        }else if(username !== "mor_2314" && password!== "83r5^_"){
            alert("Invalid username or password");
            return false;
        }else{
            const res: any = await dispatch(ReduxAPI.logIn(data));
            if(res.type === "Login/fulfilled"){
                alert("Login successful");
                localStorage.setItem("token", res.payload.data.token);
                localStorage.setItem("user", username);
                navigate("/products");
            }
        }
    }catch(e){
        alert(e);
    }
    
  }

  return (
    <>
        <div className='w-1/2 m-auto mt-auto justify-center h-56 p-4'>
            <div className='col-12 flex justify-center w-inherit'>
                <h1 className='text-pink-500 text-large font-bold h-8'>Login</h1>
            </div>
            <form>
                <div className='row mt-3'>
                    <div className='col-6 w-72'>
                        <label htmlFor='Username' className='flex justify-end text-pink-500'> Username: </label>
                    </div>
                    <div className='col-6'>
                        <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} className='mx-1 border rounded placeholder:text-sm placeholder:px-1' placeholder='Username' />
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-6 w-72'>
                    <label htmlFor='Password' className='flex justify-end text-pink-500'> Password: </label>
                        
                    </div>
                    <div className='col-6'>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='mx-1 border rounded placeholder:text-sm placeholder:px-1' placeholder='Password' />
                    </div>
                </div>
                <br/>
                <div className='col-12 flex justify-center'>
                    
                <button type='button' onClick={()=>submitHandler()} className='bg-pink-500 rounded-full h-8 text-white text-center w-16 font-bold text-sm'> Submit </button>   
                </div>
            </form>
        </div>
    </>
  )
}

export default Login