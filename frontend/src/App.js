import React from 'react';
import Header from './components/header/header';
import {Routes ,Route } from 'react-router-dom';
import Bkbosto from './pages/Bkbosto'
import Customer_info from './pages/Customer_info';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/footer';
import './App.css'

function App() {
  return (
    <> 
    <Header/>

    <div className='Content'>
      <Routes>
        <Route path="/" element={<Bkbosto/>}/>
        <Route path="/customer_info"  element={<Customer_info/>}/>
        <Route path="/cart"  element={<Cart/>}/>
        <Route path="/order"  element={<Order/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/signup"  element={<Signup/>}/>
      </Routes>
    </div>

    </>

  );
}

export default App;

