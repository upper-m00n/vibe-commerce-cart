const express= require('express');
const { mockCheckout } = require('../controllers/checkout.controller');
const router= express.Router()

router.post('/checkout',mockCheckout)

module.exports=router;