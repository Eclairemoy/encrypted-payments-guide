const express = require('express');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());

const PaymentProviders = {
  Stripe: require('./paymentProviders/stripe.js')
}

app.post('/api/checkout', async (req, res) => {
  const { card } = req.body
  console.log(card)
  
  const paymentOptions = {
    card: card,
    amount: 100,
    currency: 'eur',
    paymentReference: 'plant_purchase'
  }

  let paymentProvider = PaymentProviders.Stripe;
  const payment = await paymentProvider.makePayment(paymentOptions);

  res.send(payment);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})