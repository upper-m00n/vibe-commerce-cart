const express= require('express');
const { getCartItems, addCartItem, deleteCartItem } = require('../controllers/cart.controller');

const router= express.Router()

router.get('/cart',getCartItems);
router.post('/cart',addCartItem);
router.delete('/cart/:id',deleteCartItem);

module.exports=router;