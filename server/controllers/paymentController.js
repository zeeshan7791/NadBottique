
const dotenv=require('dotenv')
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const processPayment = async (req, res, next) => {
    try {
       
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(req.body.amount),
            currency: 'pkr',
            automatic_payment_methods: {
              enabled: true,
            },
          })
       
        res.status(200).json({ success: true, client_secret: paymentIntent.client_secret });
    } catch (error) {
        next(error);
    }
};

const sendStripeApiKey = async (req, res, next) => {
    try {
        res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    processPayment,
    sendStripeApiKey
};
