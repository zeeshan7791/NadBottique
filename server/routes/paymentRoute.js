const express=require('express')
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');

router.post('/totalbill',isAuthenticatedUser,processPayment)
router.get('/getkey',sendStripeApiKey)