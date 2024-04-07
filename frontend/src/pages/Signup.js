import React, { useState } from 'react';

const Signup = (props) => {
    const [editing, setEditing] = useState(false); // is user editing?
    const [fname, setFname] = useState(''); // user first name
    const [lname, setLname] = useState(''); // user last name
    const [phone, setPhone] = useState(''); // user phone number
    const [location, setLocation] = useState(''); // user location
    
    const renderEdit = () => {
        return (
            <div className="sign_up">
                <div className="sign_up_content">
                    <h2>SIGN UP</h2>
                    <p>First name: <input type="text" value={fname} 
                        onChange={(e) => setFname(e.target.value)} 
                        placeholder="Your first name"/></p>
                    <p>Last name: <input type="text" value={lname} 
                        onChange={(e) => setLname(e.target.value)} 
                        placeholder="Your last name"/></p>
                    <p>Phone number: <input type="text" value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="Your phone number"/></p>
                    <p>Location: <input type="text" value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        placeholder="Your current location"/></p>
                </div>
                <button onClick={() => setEditing(false)}>Save</button>
            </div>
        );
    };

    return (
        <div>
            {editing ? (
                renderEdit()
            ) : (
                <div>
                    <h2>SIGN UP</h2>
                    <p>First name: {fname}</p>
                    {fname === '' ? <p> Please enter your first name.</p>: console.log(fname) }
                    <p>Last name: {lname}</p>
                    {lname === '' ? <p> Please enter your last name.</p>: console.log(1) }
                    <p>Phone number: {phone}</p>
                    {phone === '' ? <p> Please enter your phone number.</p>: console.log(1) }
                    <p>Location: {location}</p>
                    {location === '' ? <p> Please enter your location.</p>: console.log(1) }
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={() => console.log("submit form")}>Submit</button>
                </div>
            )}
        </div> 
    );
};

export default Signup;
