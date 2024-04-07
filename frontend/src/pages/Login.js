import React from 'react'
import { Link } from 'react-router-dom'; 
function Login() {
  return (
    <div>
       <p>Phone number: <input type="text" 
          placeholder="Your phone number"/></p>
        
        <p>Mat khau: <input type="text" 
          placeholder="Your password"/></p>

      <Link to="/signup">Dang ky</Link>
    </div>
  )
}

export default Login