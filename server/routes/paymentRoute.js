const express=require('express')
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');

router.post('/process',isAuthenticatedUser,processPayment)
router.get('/stripeapikey',isAuthenticatedUser,sendStripeApiKey)

module.exports=router