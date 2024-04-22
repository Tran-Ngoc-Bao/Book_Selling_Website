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
import BookDetail from './pages/BookDetail'
import { useState } from 'react';

function App() {
  const[user,setUser]=useState(null)
  return (
    <> 
    <Header/>

    <div className='Content'>
      <Routes>
        <Route path="/" element={<Bkbosto/>}/>
        <Route path="/customer_info"  element={<Customer_info user={user} setUser={setUser}/>}/>
        <Route path="/cart"  element={<Cart/>}/>
        <Route path="/order"  element={<Order/>}/>
        <Route path="/login"  element={<Login user={user} setUser={setUser}/>}/>
        <Route path="/signup"  element={<Signup/>}/>
        <Route path="/bookdetail/:id" element={<BookDetail/>}/>
      </Routes>
    </div>

    </>

  );
}

export default App;

