import React from 'react'

const Meet = () => {
    const paymentHandler = async (e) => {
        const response = await fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: 5900,
                currency: 'INR',
                receipt: 'LoneWolf'
            })
        });
        const order = await response.json();

        var options = {
            "key": process.env.RAZORPAY_KEY_ID,
            "amount": "5900", 
            "currency": "INR",
            "name": "Lone Meet",
            "description": "Test Transaction",
            "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FhRTwRwJ_aka-icons-700x700-marketing-hand-meet-icon-hd%2F&psig=AOvVaw2XPhcvlF0wjnLLk-8W6X3j&ust=1708072461271000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMjatPT3rIQDFQAAAAAdAAAAABAE",
            "order_id": order.id, 
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": { 
                "name": "Lone Wolf",
                "email": "lonewolf@gmail.com", 
                "contact": "9752427866" 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    }
  return (
    <>
        <div className='card'>
            <h1>Book an e-meet</h1>
            <p>Book a meeting with me to discuss your project, journey or just random talk.</p>
            <p>Meet duration: 45 mins</p>
            <button onClick={paymentHandler}>Pay ₹59</button>
        </div>
    </>
  )
}

export default Meet