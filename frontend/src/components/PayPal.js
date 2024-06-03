import React, { useRef, useEffect } from "react";

export default function Paypal( props) {
  const paypal = useRef();
  const total = props.total

  useEffect(() => {
    console.log("tong tien: ",total.toFixed(1))
    const a = total.toFixed(1)
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: a
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          // thanh()
          props.thanhtoan()
          alert(order.status)
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
