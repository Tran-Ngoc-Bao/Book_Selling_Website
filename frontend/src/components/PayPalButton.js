import React, { useState } from "react";
//import "./App.module.css"; // This line might be incorrect if you're trying to import a CSS module
import PayPal from "./PayPal";

function PayPalButton() {
  const [checkout, setCheckOut] = useState(false);

  return (
    <div className="App" style={{
      fontFamily: "Trebuchet MS, 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
    }}>
      {checkout ? (
        <PayPal />
      ) : (
        <button
          onClick={() => {
            setCheckOut(true);
          }}
        >
          Checkout
        </button>
      )}
    </div>
  );
}

export default PayPalButton;
