import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Stripe = () => {
  const [product, setProduct] = useState({
    name: 'Smart Apple Watch',
    price: 100,
    productBy: 'Apple company',
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = { 'Content-Type': 'application/json' };
    return fetch(`http://localhost:5000/payment`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  return (
    <div>
      <StripeCheckout
        stripeKey='pk_test_51IePf8BenyxnrVzCU5xNMG3M5X8o4o5HGxTDDelXLTtanwQzwCZvmjTILl1DEFMqwJpstiHEg5lbI9z3Dqjsc0is00Rj3IYQ02'
        token={makePayment}
        amount={product.price * 100}
        name='Smart Apple Watch'
        shippingAddress
        billingAddress
      >
        <button>Buy just is ${product.price}</button>
      </StripeCheckout>
    </div>
  );
};

export default Stripe;
