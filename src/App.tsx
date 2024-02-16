import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import CartMain from './components/CartMain';
import Order from './components/Order';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/products' element={<ProductListing />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<CartMain />} />
          <Route path='/your-order' element={<Order />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
