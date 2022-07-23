const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const stripe = require('stripe')(process.env.SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 5000;
//middleware
app.use(express.json());
app.use(cors());
dotenv.config();

//router
app.post('/payment', (req, res) => {
  const { product, token } = req.body;
  const idempontencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      return stripe.charges.create(
        {
          amount: product.price * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name} `,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((error) => {
      console.log(error);
    });
});

//listen
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
