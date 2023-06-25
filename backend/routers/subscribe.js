const express = require('express');
const stripe = require('stripe')('sk_test_51NMT5oCsRhJHu0Rx4o0NWkfJtuGDgZcnCLOEXRMeTpUNNlTv7FvOZu2XPleHphod4384gJCvgcOlHUK0QJA1XK4B00ZoLBh0s3');

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const amount = req.body.amount;
  try {
    if (req.method != 'POST') return res.sendStatus(400);
    const { name, email, paymentMethod } = req.body;
    // Create a customer
    const customer = await stripe.customers.create({
      email,
      name,
      payment_method: paymentMethod,
      invoice_settings: { default_payment_method: paymentMethod },
    });
    // Create a product
    const product = await stripe.products.create({
      name: 'Monthly subscription',
    });
    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: 'ron',
            product: product.id,
            unit_amount: amount *100,
            recurring: {
              interval: 'month',
            },
          },
        },
      ],
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });
    // Send back the client secret for payment
    res.json({
      message: 'Subscription successfully initiated',
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
